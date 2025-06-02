import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface FiltersState {
  type: string;
  location: string;
  price: {
    min: number;
    max: number;
  };
  bedrooms: number;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FiltersState>({
    type: '',
    location: '',
    price: {
      min: 0,
      max: 5000,
    },
    bedrooms: 0,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'min' || name === 'max') {
      setFilters({
        ...filters,
        price: {
          ...filters.price,
          [name]: parseInt(value) || 0,
        },
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const resetFilters = {
      type: '',
      location: '',
      price: {
        min: 0,
        max: 5000,
      },
      bedrooms: 0,
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Find your perfect rental</h2>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          {isExpanded ? 'Show Less' : 'Advanced Search'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              placeholder="Any location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="min"
                name="min"
                value={filters.price.min}
                onChange={handleInputChange}
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                id="max"
                name="max"
                value={filters.price.max}
                onChange={handleInputChange}
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-200">
            <div>
              <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['WiFi', 'Pool', 'Parking', 'Air Conditioning'].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <input
                      type="checkbox"
                      id={amenity}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={amenity} className="ml-2 text-sm text-gray-700">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                Area (sq ft)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  id="minArea"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  id="maxArea"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="bedrooms">Most Bedrooms</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <X className="h-4 w-4 mr-1" />
            <span>Clear filters</span>
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Properties
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilters;