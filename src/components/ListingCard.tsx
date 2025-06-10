/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/9/25

  This file displays a summary card for a single rental listing in the renting marketplace website, including image, title, price, and category.
*/
// ListingCard component displays a summary card for a single listing, including image, title, price, and category.
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ImageOff } from 'lucide-react';

// Listing interface defines the structure of a listing object.
interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  location: string;
  category: string;
  condition: string;
  images: string[];
  owner_id: string;
  created_at: string;
}

// ListingCardProps defines the props for the ListingCard component.
interface ListingCardProps {
  listing: Listing;
}

// Main ListingCard component
const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  // Check if the listing has at least one image
  const hasImage = listing.images && listing.images.length > 0 && listing.images[0];

  return (
    // Card links to the listing detail page
    <Link 
      to={`/listing/${listing.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-w-16 aspect-h-9">
        {hasImage ? (
          // Show the first image if available
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          // Show a placeholder if no image is available
          <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center">
            <ImageOff className="h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm text-center px-4">
              No Image Added By Owner
            </p>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
            {listing.title}
          </h3>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded capitalize">
            {listing.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{listing.location}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-blue-600">
            ${listing.price}
            <span className="text-sm text-gray-500">/{listing.price_unit}</span>
          </div>
          
          <span className="text-sm text-gray-500 capitalize">
            {listing.condition}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;