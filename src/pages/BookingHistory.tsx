import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Calendar, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';

const BookingHistory = () => {
  const { bookings, cancelBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');

  // Sort bookings by date (newest first)
  const sortedBookings = [...bookings].sort((a, b) => 
    b.createdAt.getTime() - a.createdAt.getTime()
  );

  // Filter bookings based on active tab
  const filteredBookings = sortedBookings.filter(booking => {
    const now = new Date();
    
    if (activeTab === 'all') {
      return true;
    } else if (activeTab === 'upcoming') {
      return booking.status === 'confirmed' && booking.checkOut > now;
    } else if (activeTab === 'past') {
      return (booking.status === 'confirmed' || booking.status === 'completed') && booking.checkOut <= now;
    } else if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    
    return true;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-50 text-success-700';
      case 'cancelled':
        return 'bg-error-50 text-error-700';
      case 'completed':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="mr-1 text-success-700" />;
      case 'cancelled':
        return <XCircle size={16} className="mr-1 text-error-700" />;
      case 'completed':
        return <Clock size={16} className="mr-1 text-neutral-700" />;
      default:
        return null;
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">My Bookings</h1>
        <p className="text-neutral-600 mb-8">
          View and manage all your bookings
        </p>

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-6 border-b border-neutral-200">
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'all'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-neutral-600 hover:text-primary-700'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Bookings
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'upcoming'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-neutral-600 hover:text-primary-700'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'past'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-neutral-600 hover:text-primary-700'
            }`}
            onClick={() => setActiveTab('past')}
          >
            Past
          </button>
          <button
            className={`px-4 py-2 font-medium whitespace-nowrap ${
              activeTab === 'cancelled'
                ? 'text-primary-700 border-b-2 border-primary-700'
                : 'text-neutral-600 hover:text-primary-700'
            }`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {/* Booking Cards */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  {/* Room Image */}
                  <div className="md:w-1/4 h-48 md:h-auto">
                    <img 
                      src={booking.roomImage} 
                      alt={booking.roomName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Booking Details */}
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-primary-900 mb-1">{booking.roomName}</h2>
                        <div className="flex items-center text-sm text-neutral-600 mb-2">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span>
                          {booking.status === 'confirmed' ? 'Confirmed' : 
                           booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">Booking Date</h3>
                        <p className="text-neutral-800">{formatDate(booking.createdAt)}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">Guests</h3>
                        <p className="text-neutral-800">{booking.numberOfGuests} {booking.numberOfGuests === 1 ? 'Guest' : 'Guests'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">Total Price</h3>
                        <p className="text-neutral-800 font-bold">₹{booking.totalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-4">
                      <Link 
                        to={`/rooms/${booking.roomId}`} 
                        className="btn btn-outline flex items-center justify-center"
                      >
                        View Room
                        <ChevronRight size={16} className="ml-1" />
                      </Link>
                      
                      {booking.status === 'confirmed' && new Date() < booking.checkIn && (
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="btn bg-error-50 text-error-700 border border-error-200 hover:bg-error-100"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-primary-900 mb-2">No Bookings Found</h3>
            <p className="text-neutral-600 mb-6">
              {activeTab === 'all' 
                ? "You haven't made any bookings yet." 
                : activeTab === 'upcoming' 
                  ? "You don't have any upcoming bookings." 
                  : activeTab === 'past'
                    ? "You don't have any past bookings."
                    : "You don't have any cancelled bookings."}
            </p>
            <Link to="/rooms" className="btn btn-primary">
              Browse Rooms
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;