import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';
import RentalModal from '../components/RentalModal';

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

const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showRentalModal, setShowRentalModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = () => {
    try {
      const foundListing = LocalStorageAuth.getListingById(id!);
      setListing(foundListing);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRentalCreated = () => {
    // Refresh or show success message
    alert('Rental request submitted successfully!');
  };

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!listing) {
    return <Navigate to="/listings" />;
  }

  return (
    <div className="pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/listings"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img 
                src={listing.images[activeImage] || 'https://images.pexels.com/photos/3448250/pexels-photo-3448250.jpeg'} 
                alt={listing.title}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {listing.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`rounded-lg overflow-hidden h-20 ${
                      activeImage === index ? 'ring-2 ring-blue-600' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${listing.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize mb-2">
                {listing.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{listing.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{listing.location}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ${listing.price}
                <span className="text-lg text-gray-500">/{listing.price_unit}</span>
              </div>
              <p className="text-gray-600">Condition: <span className="capitalize font-medium">{listing.condition}</span></p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            {user && user.id !== listing.owner_id && (
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Owner
                </button>
                
                <button 
                  onClick={() => setShowRentalModal(true)}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
                >
                  Request to Rent
                </button>
              </div>
            )}

            {!user && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <Link to="/auth" className="text-blue-600 hover:underline">Sign in</Link> to contact the owner or request to rent this item.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rental Modal */}
      {showRentalModal && (
        <RentalModal
          listing={listing}
          isOpen={showRentalModal}
          onClose={() => setShowRentalModal(false)}
          onRentalCreated={handleRentalCreated}
        />
      )}
    </div>
  );
};

export default ListingDetailPage;