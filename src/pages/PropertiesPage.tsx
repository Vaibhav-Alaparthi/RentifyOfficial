import React, { useState, useEffect } from 'react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyCard from '../components/PropertyCard';
import { Property } from '../types';
import { properties as allProperties } from '../data/properties';

const PropertiesPage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties);
  const [isLoading, setIsLoading] = useState(false);

  const applyFilters = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filtered = allProperties.filter(property => {
        // Filter by type
        if (filters.type && property.type !== filters.type) {
          return false;
        }
        
        // Filter by location (case-insensitive partial match)
        if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        
        // Filter by price
        if (property.price < filters.price.min || property.price > filters.price.max) {
          return false;
        }
        
        // Filter by bedrooms
        if (filters.bedrooms > 0 && property.bedrooms < filters.bedrooms) {
          return false;
        }
        
        return true;
      });
      
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="pt-20 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Properties</h1>
          <p className="text-gray-600">
            Find your perfect rental from our selection of {allProperties.length} properties
          </p>
        </div>
        
        <PropertyFilters onFilterChange={applyFilters} />
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button 
                  onClick={() => applyFilters({
                    type: '',
                    location: '',
                    price: { min: 0, max: 5000 },
                    bedrooms: 0
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;