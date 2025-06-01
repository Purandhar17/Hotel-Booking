export interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
  images: string[];
  size: number;
  featured: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkIn: Date;
  checkOut: Date;
  guestName: string;
  guestEmail: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface FilterOptions {
  priceRange: [number, number];
  roomType: string[];
  capacity: number;
  amenities: string[];
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}