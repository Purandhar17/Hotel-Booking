import { Room } from '../types';

export const roomsData: Room[] = [
  {
    id: '1',
    name: 'Deluxe King Room',
    type: 'Deluxe',
    price: 199,
    capacity: 2,
    description: 'Experience luxury in our spacious Deluxe King Room featuring a plush king-sized bed, elegant furnishings, and a modern bathroom with premium amenities. Perfect for couples or business travelers seeking comfort and style.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-bar', 'Coffee machine', 'Air conditioning', 'Safe', 'Hairdryer', 'Bathrobes'],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    size: 32,
    featured: true
  },
  {
    id: '2',
    name: 'Superior Twin Room',
    type: 'Superior',
    price: 179,
    capacity: 2,
    description: 'Our Superior Twin Room offers two comfortable single beds, a work desk, and a cozy seating area. The room is tastefully decorated and provides all the essential amenities for a pleasant stay.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-bar', 'Coffee machine', 'Air conditioning', 'Safe', 'Hairdryer'],
    images: [
      'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg',
      'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg',
      'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg'
    ],
    size: 28,
    featured: false
  },
  {
    id: '3',
    name: 'Executive Suite',
    type: 'Suite',
    price: 299,
    capacity: 2,
    description: 'Indulge in luxury with our Executive Suite featuring a separate living area, king-sized bed, and panoramic city views. The spacious bathroom includes a bathtub and a walk-in shower. Perfect for extended stays or special occasions.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-bar', 'Coffee machine', 'Air conditioning', 'Safe', 'Hairdryer', 'Bathrobes', 'Slippers', 'Separate living area', 'Nespresso machine'],
    images: [
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg',
      'https://images.pexels.com/photos/275845/pexels-photo-275845.jpeg'
    ],
    size: 48,
    featured: true
  },
  {
    id: '4',
    name: 'Family Room',
    type: 'Family',
    price: 249,
    capacity: 4,
    description: 'Our spacious Family Room is designed with comfort in mind, featuring one king-sized bed and two single beds. The room includes a seating area and all necessary amenities to ensure a comfortable stay for families.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-bar', 'Coffee machine', 'Air conditioning', 'Safe', 'Hairdryer', 'Child-friendly amenities'],
    images: [
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg',
      'https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg',
      'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg'
    ],
    size: 42,
    featured: false
  },
  {
    id: '5',
    name: 'Presidential Suite',
    type: 'Suite',
    price: 499,
    capacity: 2,
    description: 'Our most luxurious accommodation, the Presidential Suite offers unparalleled elegance and comfort. Featuring a spacious bedroom, separate living and dining areas, and a private balcony with stunning views. The suite includes premium amenities and personalized service.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Mini-bar', 'Coffee machine', 'Air conditioning', 'Safe', 'Hairdryer', 'Bathrobes', 'Slippers', 'Separate living area', 'Nespresso machine', 'Private balcony', 'Jacuzzi', 'Butler service'],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
      'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg'
    ],
    size: 75,
    featured: true
  },
  {
    id: '6',
    name: 'Standard Queen Room',
    type: 'Standard',
    price: 149,
    capacity: 2,
    description: 'Our Standard Queen Room offers comfortable accommodations at a great value. The room features a queen-sized bed, a work desk, and a private bathroom with a shower. Perfect for short stays or budget-conscious travelers.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Air conditioning', 'Safe', 'Hairdryer'],
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    size: 24,
    featured: false
  }
];