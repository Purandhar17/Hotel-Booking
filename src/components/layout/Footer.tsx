import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">LuxStay</h3>
            <p className="text-black mb-4">
              Experience luxury and comfort in our premium hotel rooms. Perfect
              for business travelers and vacationers alike.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-sky-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-sky-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-sky-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/bookings"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-3 mt-1 flex-shrink-0 text-sky-400"
                />
                <span className="text-black">Hyderabad,Telangana,India</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-sky-400" />
                <a
                  href="tel:+1234567890"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  +91 9395985587
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-sky-400" />
                <a
                  href="mailto:info@luxstay.com"
                  className="text-black hover:text-sky-400 transition-colors"
                >
                  info@luxstay.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-black mb-4">
              Subscribe to our newsletter for special deals and offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md bg-primary-800 border border-primary-700 text-black
  placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />

              <button
                type="submit"
                className="w-full btn bg-sky-400 text-primary-900 hover:bg-sky-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-6 text-center text-black">
          <p>&copy; {currentYear} LuxStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
