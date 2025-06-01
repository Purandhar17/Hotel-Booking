import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import RoomCard from "../components/rooms/RoomCard";
import RoomFilter from "../components/rooms/RoomFilter";
import { Filter } from "lucide-react";
import { Room, FilterOptions } from "../types";

const RoomListing = () => {
  const location = useLocation();
  const { rooms, getAvailableRooms } = useBooking();
  const [filteredRooms, setFilteredRooms] = useState<Room[]>(rooms);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Default filter values
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 500],
    roomType: [],
    capacity: 1,
    amenities: [],
  });

  // Parse URL params for dates and guests
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkInParam = params.get("checkIn");
    const checkOutParam = params.get("checkOut");
    const guestsParam = params.get("guests");

    if (checkInParam && checkOutParam) {
      const checkIn = new Date(checkInParam);
      const checkOut = new Date(checkOutParam);
      const guests = guestsParam ? parseInt(guestsParam) : 1;

      // Update capacity filter
      setFilters((prev) => ({
        ...prev,
        capacity: guests,
      }));

      // Get available rooms for the date range
      const availableRooms = getAvailableRooms(checkIn, checkOut);
      applyFilters(availableRooms);
    } else {
      applyFilters(rooms);
    }

    setLoading(false);
  }, [location.search, rooms]);

  const applyFilters = (roomsToFilter: Room[]) => {
    let result = roomsToFilter;

    // Filter by price range
    result = result.filter(
      (room) =>
        room.price >= filters.priceRange[0] &&
        room.price <= filters.priceRange[1]
    );

    // Filter by room type
    if (filters.roomType.length > 0) {
      result = result.filter((room) => filters.roomType.includes(room.type));
    }

    // Filter by capacity
    result = result.filter((room) => room.capacity >= filters.capacity);

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((room) =>
        filters.amenities.every((amenity) => room.amenities.includes(amenity))
      );
    }

    setFilteredRooms(result);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    applyFilters(rooms);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Our Rooms
            </h1>
            <p className="text-neutral-600">
              Find the perfect accommodation for your stay
            </p>
          </div>

          <button
            className="mt-4 md:mt-0 flex items-center btn btn-outline md:hidden"
            onClick={toggleFilters}
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Always visible on desktop, toggleable on mobile */}
          <div
            className={`md:w-1/4 ${showFilters ? "block" : "hidden"} md:block`}
          >
            <RoomFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Room listings */}
          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
              </div>
            ) : filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  No Rooms Found
                </h3>
                <p className="text-neutral-600 mb-4">
                  We couldn't find any rooms matching your criteria. Try
                  adjusting your filters or dates.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 500],
                      roomType: [],
                      capacity: 1,
                      amenities: [],
                    });
                    applyFilters(rooms);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomListing;
