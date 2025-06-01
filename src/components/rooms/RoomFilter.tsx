import React, { useState, useEffect } from "react";
import { FilterOptions } from "../../types";
import { Slider, ChevronDown } from "lucide-react";

interface RoomFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const RoomFilter = ({ filters, onFilterChange }: RoomFilterProps) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    roomType: true,
    capacity: true,
    amenities: true,
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value);
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = value;

    // Ensure min doesn't exceed max
    if (index === 0 && value > newPriceRange[1]) {
      newPriceRange[1] = value;
    }

    // Ensure max isn't less than min
    if (index === 1 && value < newPriceRange[0]) {
      newPriceRange[0] = value;
    }

    const updatedFilters = {
      ...localFilters,
      priceRange: newPriceRange,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRoomTypeChange = (type: string) => {
    let newRoomTypes: string[];

    if (localFilters.roomType.includes(type)) {
      newRoomTypes = localFilters.roomType.filter((t) => t !== type);
    } else {
      newRoomTypes = [...localFilters.roomType, type];
    }

    const updatedFilters = {
      ...localFilters,
      roomType: newRoomTypes,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const capacity = parseInt(e.target.value);
    const updatedFilters = {
      ...localFilters,
      capacity,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleAmenityChange = (amenity: string) => {
    let newAmenities: string[];

    if (localFilters.amenities.includes(amenity)) {
      newAmenities = localFilters.amenities.filter((a) => a !== amenity);
    } else {
      newAmenities = [...localFilters.amenities, amenity];
    }

    const updatedFilters = {
      ...localFilters,
      amenities: newAmenities,
    };

    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const resetValues: FilterOptions = {
      priceRange: [0, 500],
      roomType: [],
      capacity: 1,
      amenities: [],
    };

    setLocalFilters(resetValues);
    onFilterChange(resetValues);
  };

  // Room types and amenities for the filter
  const roomTypes = ["Standard", "Deluxe", "Superior", "Suite", "Family"];
  const amenities = [
    "Free Wi-Fi",
    "Air conditioning",
    "Flat-screen TV",
    "Mini-bar",
    "Coffee machine",
    "Bathtub",
    "Balcony",
    "Separate living area",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-primary-900">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-primary-700 hover:text-primary-900 font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b border-neutral-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-neutral-800 mb-2"
          onClick={() => toggleSection("price")}
        >
          <span>Price Range</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">
                ₹{localFilters.priceRange[0]}
              </span>
              <span className="text-neutral-600">
                ₹{localFilters.priceRange[1]}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={localFilters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={localFilters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 mt-3">
              <div className="flex items-center border rounded px-3 py-1 w-full">
                <span className="text-neutral-500 mr-1">₹</span>
                <input
                  type="number"
                  min="0"
                  max={localFilters.priceRange[1]}
                  value={localFilters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(e, 0)}
                  className="w-full focus:outline-none"
                />
              </div>
              <div className="flex items-center border rounded px-3 py-1 w-full">
                <span className="text-neutral-500 mr-1">₹</span>
                <input
                  type="number"
                  min={localFilters.priceRange[0]}
                  max="500"
                  value={localFilters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(e, 1)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Room Type Filter */}
      <div className="mb-6 border-b border-neutral-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-neutral-800 mb-2"
          onClick={() => toggleSection("roomType")}
        >
          <span>Room Type</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.roomType ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.roomType && (
          <div className="mt-3 space-y-2">
            {roomTypes.map((type) => (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.roomType.includes(type)}
                  onChange={() => handleRoomTypeChange(type)}
                  className="mr-2 h-4 w-4 text-primary-700 rounded focus:ring-primary-500"
                />
                <span className="text-neutral-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Capacity Filter */}
      <div className="mb-6 border-b border-neutral-200 pb-4">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-neutral-800 mb-2"
          onClick={() => toggleSection("capacity")}
        >
          <span>Guests</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.capacity ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.capacity && (
          <div className="mt-3">
            <select
              value={localFilters.capacity}
              onChange={handleCapacityChange}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Guest" : "Guests"} or more
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left font-medium text-neutral-800 mb-2"
          onClick={() => toggleSection("amenities")}
        >
          <span>Amenities</span>
          <ChevronDown
            size={18}
            className={`transition-transform ${
              expandedSections.amenities ? "rotate-180" : ""
            }`}
          />
        </button>

        {expandedSections.amenities && (
          <div className="mt-3 space-y-2">
            {amenities.map((amenity) => (
              <label key={amenity} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.amenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="mr-2 h-4 w-4 text-primary-700 rounded focus:ring-primary-500"
                />
                <span className="text-neutral-700">{amenity}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        className="w-full btn btn-primary"
        onClick={() => onFilterChange(localFilters)}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default RoomFilter;
