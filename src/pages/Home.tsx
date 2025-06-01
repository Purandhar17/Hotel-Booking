import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Search } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBooking } from '../context/BookingContext';
import FeaturedRooms from '../components/rooms/FeaturedRooms';
import Testimonials from '../components/home/Testimonials';
import Amenities from '../components/home/Amenities';

const Home = () => {
  const navigate = useNavigate();
  const { getAvailableRooms } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [guests, setGuests] = useState<number>(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkIn && checkOut) {
      // Create query params
      const params = new URLSearchParams();
      params.append('checkIn', checkIn.toISOString());
      params.append('checkOut', checkOut.toISOString());
      params.append('guests', guests.toString());
      
      navigate(`/rooms?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center flex items-center" 
        style={{ 
          backgroundImage: 'url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container relative z-10 mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in">Experience Luxury and Comfort</h1>
            <p className="text-xl md:text-2xl mb-8 fade-in">
              Book your stay at our premium hotel and enjoy world-class amenities and exceptional service.
            </p>
            
            {/* Search Form */}
            <div className="bg-white rounded-lg p-4 shadow-lg mt-8 slide-up">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Check-in
                  </label>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Check-out
                  </label>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={checkIn || new Date()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <Users size={16} className="mr-2" />
                    Guests
                  </label>
                  <div className="flex">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                    <button 
                      type="submit"
                      className="bg-primary-700 text-white px-4 py-2 rounded-r-md hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 flex items-center"
                    >
                      <Search size={20} className="mr-2" />
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <FeaturedRooms />

      {/* Amenities Section */}
      <Amenities />

      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay now and enjoy our premium services and amenities.
          </p>
          <Link 
            to="/rooms" 
            className="btn bg-accent-gold text-primary-900 hover:bg-accent-gold/90 text-lg px-8 py-3"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;