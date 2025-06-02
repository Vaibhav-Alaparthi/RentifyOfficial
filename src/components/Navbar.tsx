import React, { useState, useEffect } from 'react';
import { Home, Search, Menu, X } from 'lucide-react';
import { Link } from '../utils/RouterUtils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-blue-600" />
          <span className={`font-bold text-xl ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}>
            RentEase
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
            Home
          </Link>
          <Link to="/properties" className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
            Properties
          </Link>
          <Link to="/about" className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
            About
          </Link>
          <Link to="/contact" className={`font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-700'} hover:text-blue-600 transition-colors`}>
            Contact
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Find Rentals
          </button>
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/properties" className="font-medium text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Properties
            </Link>
            <Link to="/about" className="font-medium text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="font-medium text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Search className="h-4 w-4 mr-2" />
              Find Rentals
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;