import React from "react";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { Room } from "../../types";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  // Display only first 3 amenities
  const displayedAmenities = room.amenities.slice(0, 3);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
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
        <h3 className="text-xl font-bold text-primary-900 mb-2">{room.name}</h3>

        <div className="flex items-center text-neutral-600 mb-3">
          <span className="flex items-center">
            <Users size={16} className="mr-1" />
            {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
          </span>
          <span className="mx-2">•</span>
          <span>{room.size} m²</span>
        </div>

        <p className="text-neutral-600 mb-4 line-clamp-2">{room.description}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {displayedAmenities.map((amenity, index) => (
              <span
                key={index}
                className="inline-block bg-neutral-100 text-neutral-700 text-sm px-2 py-1 rounded"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="inline-block text-neutral-500 text-sm px-2 py-1">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-primary-900 text-lg">
            ₹{room.price}
            <span className="text-neutral-500 text-sm font-normal">
              {" "}
              / night
            </span>
          </span>

          <Link
            to={`/rooms/${room.id}`}
            className="flex items-center font-medium text-primary-700 hover:text-primary-900"
          >
            View Details
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
