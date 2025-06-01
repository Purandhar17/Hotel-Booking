import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Room, Booking } from '../types';
import { roomsData } from '../data/roomsData';

interface BookingContextType {
  rooms: Room[];
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  getAvailableRooms: (checkIn: Date, checkOut: Date) => Room[];
  isRoomAvailable: (roomId: string, checkIn: Date, checkOut: Date) => boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Initialize rooms and load bookings from localStorage
  useEffect(() => {
    setRooms(roomsData);
    
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        // Convert string dates back to Date objects
        const bookingsWithDates = parsedBookings.map((booking: any) => ({
          ...booking,
          checkIn: new Date(booking.checkIn),
          checkOut: new Date(booking.checkOut),
          createdAt: new Date(booking.createdAt)
        }));
        setBookings(bookingsWithDates);
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
        setBookings([]);
      }
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Check if a room is available for a given date range
  const isRoomAvailable = (roomId: string, checkIn: Date, checkOut: Date): boolean => {
    return !bookings.some(booking => 
      booking.roomId === roomId && 
      booking.status !== 'cancelled' &&
      ((checkIn >= booking.checkIn && checkIn < booking.checkOut) || 
      (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
      (checkIn <= booking.checkIn && checkOut >= booking.checkOut))
    );
  };

  // Get all available rooms for a given date range
  const getAvailableRooms = (checkIn: Date, checkOut: Date): Room[] => {
    return rooms.filter(room => isRoomAvailable(room.id, checkIn, checkOut));
  };

  // Add a new booking
  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  // Cancel a booking
  const cancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' } 
          : booking
      )
    );
  };

  const value = {
    rooms,
    bookings,
    addBooking,
    cancelBooking,
    getAvailableRooms,
    isRoomAvailable
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};