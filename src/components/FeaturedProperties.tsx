import React from 'react';
import { ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property } from '../types';
import { Link } from '../utils/RouterUtils';

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  // Filter featured properties and limit to 3
  const featuredProperties = properties
    .filter(property => property.featured)
    .slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked selection of exceptional properties that stand out for their unique features and prime locations.
            </p>
          </div>
          
          <Link 
            to="/properties"
            className="mt-4 md:mt-0 inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            View all properties
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;