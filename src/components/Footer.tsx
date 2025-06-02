import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from '../utils/RouterUtils';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 text-blue-400" />
              <span className="ml-2 font-bold text-xl">RentEase</span>
            </div>
            <p className="text-gray-300 mb-6">
              Making your rental journey simple and stress-free. Find your perfect temporary home with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors">Properties</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/properties?type=apartment" className="text-gray-300 hover:text-white transition-colors">Apartments</Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-gray-300 hover:text-white transition-colors">Houses</Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-gray-300 hover:text-white transition-colors">Villas</Link>
              </li>
              <li>
                <Link to="/properties?type=cabin" className="text-gray-300 hover:text-white transition-colors">Cabins</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-300">
                  123 Rental Street, Suite 456<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <a href="tel:+12345678900" className="text-gray-300 hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <a href="mailto:info@rentease.com" className="text-gray-300 hover:text-white transition-colors">
                  info@rentease.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} RentEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;