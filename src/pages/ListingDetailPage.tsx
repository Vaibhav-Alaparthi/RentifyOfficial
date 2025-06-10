import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { MapPin, Clock, ArrowLeft, MessageCircle, ImageOff, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';
import RentalModal from '../components/RentalModal';
import ChatModal from '../components/ChatModal';
import EditListingModal from '../components/EditListingModal';

// ListingDetailPage displays detailed information about a single listing, including images, owner actions, and modals for rental, chat, edit, and delete.
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

// Main ListingDetailPage component
const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [showRentalModal, setShowRentalModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchListing();
    }
  }, [id]);

  // Fetches the listing details by ID
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

  // Handles rental creation callback
  const handleRentalCreated = () => {
    // Refresh or show success message
    alert('Rental request submitted successfully!');
  };

  // Handles listing update callback
  const handleListingUpdated = (updatedListing: Listing) => {
    setListing(updatedListing);
  };

  // Handles listing deletion
  const handleDeleteListing = () => {
    if (!listing || !user || listing.owner_id !== user.id) return;

    const success = LocalStorageAuth.deleteListing(listing.id);
    if (success) {
      alert('Listing deleted successfully!');
      navigate('/listings');
    } else {
      alert('Error deleting listing. Please try again.');
    }
  };

  // Checks if the current user is the owner of the listing
  const isOwner = user && listing && user.id === listing.owner_id;

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

  // Check if the listing has images
  const hasImages = listing.images && listing.images.length > 0 && listing.images[0];

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
              {hasImages ? (
                <img 
                  src={listing.images[activeImage]} 
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gray-100 flex flex-col items-center justify-center">
                  <ImageOff className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg text-center px-4">
                    No Image Added By Owner
                  </p>
                </div>
              )}
            </div>
            
            {hasImages && listing.images.length > 1 && (
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
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full capitalize">
                  {listing.category}
                </span>
                
                {/* Owner Actions */}
                {isOwner && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
              
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

            {/* Action Buttons for Non-Owners */}
            {user && !isOwner && (
              <div className="space-y-3">
                <button 
                  onClick={() => setShowChatModal(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
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

            {/* Owner Message */}
            {isOwner && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  This is your listing. You can edit or delete it using the buttons above.
                </p>
              </div>
            )}

            {/* Sign In Message for Non-Users */}
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

      {/* Chat Modal */}
      {showChatModal && (
        <ChatModal
          listing={listing}
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditListingModal
          listing={listing}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onListingUpdated={handleListingUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Delete Listing</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this listing? This action cannot be undone and will also remove all related rental requests and messages.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteListing}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetailPage;