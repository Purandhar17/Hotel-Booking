import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Calendar, History } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-900">
          LuxStay
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary-700' 
                : isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white hover:text-primary-200'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/rooms" 
            className={`font-medium transition-colors ${
              location.pathname.includes('/rooms') 
                ? 'text-primary-700' 
                : isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white hover:text-primary-200'
            }`}
          >
            Rooms
          </Link>
          <Link 
            to="/bookings" 
            className={`font-medium transition-colors ${
              location.pathname === '/bookings' 
                ? 'text-primary-700' 
                : isScrolled ? 'text-neutral-800 hover:text-primary-700' : 'text-white hover:text-primary-200'
            }`}
          >
            My Bookings
          </Link>
          <button 
            className={`btn ${
              isScrolled ? 'btn-primary' : 'bg-white text-primary-900 hover:bg-neutral-100'
            }`}
          >
            Book Now
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className={isScrolled ? 'text-neutral-800' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-neutral-800' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold text-primary-900">
              LuxStay
            </Link>
            <button 
              className="p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X className="text-neutral-800" size={24} />
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-lg">
            <Link 
              to="/" 
              className="flex items-center space-x-3 text-neutral-800 hover:text-primary-700"
            >
              <Calendar size={20} />
              <span>Home</span>
            </Link>
            <Link 
              to="/rooms" 
              className="flex items-center space-x-3 text-neutral-800 hover:text-primary-700"
            >
              <Calendar size={20} />
              <span>Rooms</span>
            </Link>
            <Link 
              to="/bookings" 
              className="flex items-center space-x-3 text-neutral-800 hover:text-primary-700"
            >
              <History size={20} />
              <span>My Bookings</span>
            </Link>
            <div className="pt-6 mt-auto">
              <button className="w-full btn btn-primary">
                Book Now
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;