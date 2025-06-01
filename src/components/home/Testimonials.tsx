import React from "react";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sanjana",
      photo:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
      text: "Our stay at LuxStay was absolutely perfect. The room was beautiful, the staff was attentive, and the amenities were top-notch. We will  definitely be coming back!",
    },
    {
      name: "Raghav",
      photo:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5,
      text: "The attention to detail in this hotel is impressive. From the moment we checked in until our departure, everything was handled with utmost professionalism.",
    },
    {
      name: "Samhitha",
      photo:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4,
      text: "Beautiful property with excellent service. The rooms were spacious and comfortable. I especially enjoyed the breakfast buffet with its wide variety of options.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our recent guests have
            to say about their experience at LuxStay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-50 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-primary-900">
                      {testimonial.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < testimonial.rating
                              ? "text-accent-gold fill-accent-gold"
                              : "text-neutral-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-600 flex-grow">
                  "{testimonial.text}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
