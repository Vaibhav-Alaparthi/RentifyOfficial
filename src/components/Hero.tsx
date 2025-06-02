import React from 'react';
import { Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" 
          alt="Modern living room"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Hero content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-6 max-w-3xl">
          Find Your Perfect Place to Call Home
        </h1>
        <p className="text-lg md:text-xl text-white text-center mb-8 max-w-2xl">
          Discover thousands of rental properties in top locations. 
          From cozy apartments to luxury homes.
        </p>
        
        {/* Search form */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Where do you want to live?"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                id="property-type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
              </select>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                id="price-range"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any price</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000</option>
                <option value="3000+">$3,000+</option>
              </select>
            </div>
            
            <div className="md:flex md:items-end">
              <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center justify-center">
                <Search className="h-4 w-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;