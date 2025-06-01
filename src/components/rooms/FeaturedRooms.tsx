import React from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../../context/BookingContext";
import { ArrowRight } from "lucide-react";

const FeaturedRooms = () => {
  const { rooms } = useBooking();
  const featuredRooms = rooms.filter((room) => room.featured);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            Featured Rooms
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular accommodations, designed for maximum
            comfort and luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-0 right-0 bg-accent-gold text-primary-900 font-semibold px-4 py-2">
                  ₹{room.price}/night
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {room.name}
                </h3>
                <div className="flex items-center text-neutral-600 mb-4">
                  <span>{room.type} Room</span>
                  <span className="mx-2">•</span>
                  <span>
                    {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{room.size} m²</span>
                </div>
                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {room.description}
                </p>
                <Link
                  to={`/rooms/${room.id}`}
                  className="flex items-center font-medium text-primary-700 hover:text-primary-900"
                >
                  View Details
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/rooms"
            className="btn btn-primary inline-flex items-center"
          >
            View All Rooms
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRooms;
