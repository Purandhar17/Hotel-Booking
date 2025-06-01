import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { Room, DateRange } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Users,
  Calendar,
  Check,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Coffee,
  Wifi,
  Tv,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { rooms, isRoomAvailable, addBooking } = useBooking();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  });
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({
    guestName: "",
    guestEmail: "",
  });

  useEffect(() => {
    if (id) {
      const foundRoom = rooms.find((r) => r.id === id);
      if (foundRoom) {
        setRoom(foundRoom);
        setMainImage(foundRoom.images[0]);
        setGuests(1);
      }
    }
    setLoading(false);
  }, [id, rooms]);

  useEffect(() => {
    if (room && dateRange.startDate && dateRange.endDate) {
      // Check if room is available for selected dates
      const available = isRoomAvailable(
        room.id,
        dateRange.startDate,
        dateRange.endDate
      );
      setIsAvailable(available);

      // Calculate total nights and price
      const nights = Math.ceil(
        (dateRange.endDate.getTime() - dateRange.startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setTotalNights(nights);
      setTotalPrice(nights * room.price);
    }
  }, [room, dateRange, isRoomAvailable]);

  const handleImageChange = (image: string, index: number) => {
    setMainImage(image);
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (room) {
      const newIndex = (currentImageIndex + 1) % room.images.length;
      setMainImage(room.images[newIndex]);
      setCurrentImageIndex(newIndex);
    }
  };

  const prevImage = () => {
    if (room) {
      const newIndex =
        (currentImageIndex - 1 + room.images.length) % room.images.length;
      setMainImage(room.images[newIndex]);
      setCurrentImageIndex(newIndex);
    }
  };

  const handleDateChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    if (start && end) {
      setDateRange({
        startDate: start,
        endDate: end,
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { guestName: "", guestEmail: "" };

    if (!guestName.trim()) {
      newErrors.guestName = "Name is required";
      valid = false;
    }

    if (!guestEmail.trim()) {
      newErrors.guestEmail = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      newErrors.guestEmail = "Email is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !room || !isAvailable) {
      return;
    }

    // Create a new booking
    const newBooking = {
      id: uuidv4(),
      userId: "user-1", // In a real app, this would come from auth
      roomId: room.id,
      roomName: room.name,
      roomImage: room.images[0],
      checkIn: dateRange.startDate,
      checkOut: dateRange.endDate,
      guestName,
      guestEmail,
      numberOfGuests: guests,
      totalPrice,
      status: "confirmed" as const,
      createdAt: new Date(),
    };

    // Add booking to context
    addBooking(newBooking);
    setBookingSuccess(true);

    // Reset form
    setGuestName("");
    setGuestEmail("");

    // After 3 seconds, redirect to booking history
    setTimeout(() => {
      navigate("/bookings");
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-700"></div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">
            Room Not Found
          </h1>
          <p className="text-neutral-600 mb-6">
            The room you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/rooms")}
            className="btn btn-primary"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  // Map amenity names to icons
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "Free Wi-Fi":
        return <Wifi size={18} />;
      case "Coffee machine":
        return <Coffee size={18} />;
      case "Flat-screen TV":
        return <Tv size={18} />;
      default:
        return <Check size={18} />;
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        {/* Room Navigation */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/rooms")}
            className="flex items-center text-primary-700 hover:text-primary-900 font-medium"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Rooms
          </button>
        </div>

        {/* Room Title and Basic Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            {room.name}
          </h1>
          <div className="flex items-center text-neutral-600">
            <span>{room.type} Room</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Users size={16} className="mr-1" />
              {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
            </span>
            <span className="mx-2">•</span>
            <span>{room.size} m²</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Room Images and Details */}
          <div className="lg:w-2/3">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden h-80 md:h-96">
                <img
                  src={mainImage}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-4 right-4 bg-white bg-opacity-70 px-3 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {room.images.length}
                </div>
              </div>
              <div className="flex mt-4 space-x-4 overflow-x-auto pb-2">
                {room.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-24 h-16 rounded-md overflow-hidden cursor-pointer 
                      ${
                        mainImage === image
                          ? "ring-2 ring-primary-700"
                          : "opacity-70"
                      }`}
                    onClick={() => handleImageChange(image, index)}
                  >
                    <img
                      src={image}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Room Description */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                Room Description
              </h2>
              <p className="text-neutral-700 mb-4">{room.description}</p>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary-900 mb-3">
                  Room Size
                </h3>
                <div className="flex items-center text-neutral-700">
                  <Maximize size={18} className="mr-2 text-primary-700" />
                  {room.size} m²
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-primary-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="text-primary-700 mr-3">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-neutral-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              {bookingSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-50 text-success-500 mb-4">
                    <Check size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Your booking has been successfully confirmed. You will be
                    redirected to your bookings page shortly.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-primary-900 mb-4">
                    Book This Room
                  </h2>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-neutral-700 font-medium">
                        Price
                      </span>
                      <span className="text-2xl font-bold text-primary-900">
                        ₹{room.price}
                        <span className="text-sm font-normal text-neutral-600">
                          /night
                        </span>
                      </span>
                    </div>

                    <div
                      className={`p-3 rounded-md ${
                        isAvailable
                          ? "bg-success-50 text-success-700"
                          : "bg-error-50 text-error-700"
                      } mb-4`}
                    >
                      {isAvailable ? (
                        <div className="flex items-center">
                          <Check size={18} className="mr-2" />
                          <span>Available for selected dates</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span>Not available for selected dates</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleBooking}>
                    {/* Date Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center">
                        <Calendar size={16} className="mr-2" />
                        Check-in / Check-out
                      </label>
                      <DatePicker
                        selected={dateRange.startDate}
                        onChange={handleDateChange}
                        startDate={dateRange.startDate}
                        endDate={dateRange.endDate}
                        selectsRange
                        minDate={new Date()}
                        monthsShown={1}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholderText="Select date range"
                      />
                    </div>

                    {/* Guests Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center">
                        <Users size={16} className="mr-2" />
                        Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Information */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className={`w-full px-3 py-2 border ${
                          errors.guestName
                            ? "border-error-500"
                            : "border-neutral-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        placeholder="Enter your full name"
                      />
                      {errors.guestName && (
                        <p className="mt-1 text-sm text-error-500">
                          {errors.guestName}
                        </p>
                      )}
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className={`w-full px-3 py-2 border ${
                          errors.guestEmail
                            ? "border-error-500"
                            : "border-neutral-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        placeholder="Enter your email"
                      />
                      {errors.guestEmail && (
                        <p className="mt-1 text-sm text-error-500">
                          {errors.guestEmail}
                        </p>
                      )}
                    </div>

                    {/* Price Summary */}
                    <div className="border-t border-b border-neutral-200 py-4 mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-neutral-700">
                          ₹{room.price} x {totalNights} nights
                        </span>
                        <span className="text-neutral-700">₹{totalPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span className="text-neutral-800">Total</span>
                        <span className="text-primary-900">₹{totalPrice}</span>
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      type="submit"
                      disabled={!isAvailable}
                      className={`w-full btn ${
                        isAvailable
                          ? "btn-primary"
                          : "bg-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? "Book Now" : "Not Available"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
