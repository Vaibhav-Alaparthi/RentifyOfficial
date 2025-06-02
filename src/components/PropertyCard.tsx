import React from 'react';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Property } from '../types';
import { Link } from '../utils/RouterUtils';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, featured = false }) => {
  const { id, title, location, price, priceUnit, bedrooms, bathrooms, area, images } = property;
  
  return (
    <Link 
      to={`/property/${id}`}
      className={`group block overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg ${
        featured ? 'lg:flex lg:h-72' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : 'h-52'}`}>
        <img 
          src={images[0]} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {property.featured && !featured && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      
      <div className={`p-4 ${featured ? 'lg:w-1/2 lg:p-6' : ''}`}>
        {featured && (
          <div className="mb-2 inline-block bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
        <h3 className="mb-1 text-xl font-semibold text-gray-800 line-clamp-1">{title}</h3>
        
        <div className="mb-3 flex items-center text-gray-500">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex items-center text-gray-700">
            <Bed className="mr-1 h-4 w-4" />
            <span className="text-sm">{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Bath className="mr-1 h-4 w-4" />
            <span className="text-sm">{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Square className="mr-1 h-4 w-4" />
            <span className="text-sm">{area} ft²</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-600">${price}</span>
            <span className="text-gray-500 text-sm">
              /{priceUnit === 'day' ? 'night' : priceUnit}
            </span>
          </div>
          
          <button className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;