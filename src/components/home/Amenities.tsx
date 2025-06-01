import React from 'react';
import { Wifi, Coffee, Dumbbell, Utensils, Car, Timer as Swimmer } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    {
      icon: <Wifi size={36} className="text-accent-gold" />,
      title: 'Free Wi-Fi',
      description: 'Stay connected with high-speed internet access throughout the hotel.'
    },
    {
      icon: <Coffee size={36} className="text-accent-gold" />,
      title: 'Breakfast Included',
      description: 'Start your day with our complimentary gourmet breakfast buffet.'
    },
    {
      icon: <Dumbbell size={36} className="text-accent-gold" />,
      title: 'Fitness Center',
      description: 'Keep up with your fitness routine in our fully-equipped gym.'
    },
    {
      icon: <Swimmer size={36} className="text-accent-gold" />,
      title: 'Swimming Pool',
      description: 'Relax and unwind in our luxurious indoor and outdoor pools.'
    },
    {
      icon: <Utensils size={36} className="text-accent-gold" />,
      title: 'Restaurant & Bar',
      description: 'Enjoy fine dining and cocktails at our on-site restaurant and bar.'
    },
    {
      icon: <Car size={36} className="text-accent-gold" />,
      title: 'Free Parking',
      description: 'Complimentary parking for all hotel guests during their stay.'
    }
  ];

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">Hotel Amenities</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Enjoy our wide range of premium amenities designed to make your stay comfortable and memorable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {amenity.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  {amenity.title}
                </h3>
                <p className="text-neutral-600">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;