import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import RoomListing from './pages/RoomListing';
import RoomDetail from './pages/RoomDetail';
import BookingHistory from './pages/BookingHistory';
import { BookingProvider } from './context/BookingContext';
import ScrollToTop from './utils/ScrollToTop';
import './App.css';

function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-neutral-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<RoomListing />} />
              <Route path="/rooms/:id" element={<RoomDetail />} />
              <Route path="/bookings" element={<BookingHistory />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;