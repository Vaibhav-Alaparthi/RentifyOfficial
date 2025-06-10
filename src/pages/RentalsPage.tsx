/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/9/25

  This file displays all rentals for the current user in the renting marketplace website, organized into 'renting' and 'lending' tabs with options to manage rental status and initiate chats.
*/
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, User, Package, MessageCircle, ImageOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';
import ChatModal from '../components/ChatModal';

// Rental interface represents a rental transaction.
interface Rental {
  id: string;
  listing_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  total_price: number;
  created_at: string;
  updated_at: string;
}

// Listing interface represents a minimal listing for rental context.
interface Listing {
  id: string;
  title: string;
  images: string[];
}

// RentalWithListing extends Rental with listing details.
interface RentalWithListing extends Rental {
  listing: Listing | null;
}

// Main RentalsPage component
const RentalsPage: React.FC = () => {
  const { user } = useAuth();
  // State for all rentals with listing details
  const [rentals, setRentals] = useState<RentalWithListing[]>([]);
  // Loading state for data fetch
  const [loading, setLoading] = useState(true);
  // Tab state: 'renting' (as renter) or 'lending' (as owner)
  const [activeTab, setActiveTab] = useState<'renting' | 'lending'>('renting');
  // State for the currently selected listing for chat
  const [selectedChatListing, setSelectedChatListing] = useState<any>(null);

  // Fetch rentals when user changes
  useEffect(() => {
    if (user) {
      fetchRentals();
    }
  }, [user]);

  // Loads all rentals for the user, including listing details
  const fetchRentals = () => {
    if (!user) return;

    try {
      const userRentals = LocalStorageAuth.getRentalsByUser(user.id);
      const rentalsWithListings = userRentals.map(rental => ({
        ...rental,
        listing: LocalStorageAuth.getListingById(rental.listing_id)
      }));
      
      setRentals(rentalsWithListings);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handles updating rental status (approve, reject, complete)
  const handleStatusUpdate = (rentalId: string, newStatus: Rental['status']) => {
    try {
      LocalStorageAuth.updateRentalStatus(rentalId, newStatus);
      fetchRentals(); // Refresh the list
    } catch (error) {
      console.error('Error updating rental status:', error);
    }
  };

  // Handles opening the chat modal for a rental
  const handleChatClick = (rental: RentalWithListing) => {
    if (!rental.listing) return;
    
    // Determine who the other party is
    const otherUserId = activeTab === 'renting' ? rental.owner_id : rental.renter_id;
    
    setSelectedChatListing({
      id: rental.listing_id,
      title: rental.listing.title,
      owner_id: otherUserId
    });
  };

  // Returns a color class for the rental status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Gets the email of the other user in the rental
  const getOtherUserEmail = (rental: RentalWithListing) => {
    const otherUserId = activeTab === 'renting' ? rental.owner_id : rental.renter_id;
    const otherUser = LocalStorageAuth.getUserById(otherUserId);
    return otherUser?.email || 'Unknown User';
  };

  // Formats a date string for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // If user is not signed in, prompt to sign in
  if (!user) {
    return (
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">My Rentals</h1>
          <p className="text-gray-600">Please sign in to view your rentals.</p>
          <Link to="/auth" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Separate rentals into those the user is renting and lending
  const rentingRentals = rentals.filter(rental => rental.renter_id === user.id);
  const lendingRentals = rentals.filter(rental => rental.owner_id === user.id);

  return (
    <div className="pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Rentals</h1>

        {/* Tabs for switching between renting and lending */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('renting')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'renting'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Package className="h-4 w-4 inline mr-2" />
            Items I'm Renting ({rentingRentals.length})
          </button>
          <button
            onClick={() => setActiveTab('lending')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'lending'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Items I'm Lending ({lendingRentals.length})
          </button>
        </div>

        {/* Rental List for active tab */}
        <div className="space-y-4">
          {(activeTab === 'renting' ? rentingRentals : lendingRentals).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {activeTab === 'renting' 
                  ? "You haven't rented any items yet" 
                  : "No one has requested to rent your items yet"
                }
              </p>
              <Link 
                to="/listings" 
                className="inline-block mt-4 text-blue-600 hover:text-blue-800"
              >
                Browse available items
              </Link>
            </div>
          ) : (
            // Render a card for each rental in the active tab
            (activeTab === 'renting' ? rentingRentals : lendingRentals).map(rental => {
              const hasImage = rental.listing?.images && rental.listing.images.length > 0 && rental.listing.images[0];
              
              return (
                <div key={rental.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Item Image or Placeholder */}
                    <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {hasImage ? (
                        <img
                          src={rental.listing.images[0]}
                          alt={rental.listing?.title || 'Item'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
                          <ImageOff className="h-8 w-8 text-gray-400 mb-1" />
                          <p className="text-gray-500 text-xs text-center px-2">
                            No Image Added By Owner
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Rental Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">
                          <Link 
                            to={`/listing/${rental.listing_id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {rental.listing?.title || 'Unknown Item'}
                          </Link>
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(rental.status)}`}>
                          {rental.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <span className="font-medium">
                          {activeTab === 'renting' ? 'Owner: ' : 'Renter: '}
                        </span>
                        {getOtherUserEmail(rental)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(rental.start_date)} - {formatDate(rental.end_date)}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>${rental.total_price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Requested {formatDate(rental.created_at)}</span>
                        </div>
                      </div>

                      {/* Action Buttons for chat and status updates */}
                      <div className="flex flex-wrap gap-2">
                        {/* Chat Button - Always Available */}
                        <button
                          onClick={() => handleChatClick(rental)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Chat with {activeTab === 'renting' ? 'Owner' : 'Renter'}</span>
                        </button>

                        {/* Owner Action Buttons for pending rentals */}
                        {activeTab === 'lending' && rental.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(rental.id, 'approved')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(rental.id, 'rejected')}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {/* Mark as Completed for Approved Rentals */}
                        {rental.status === 'approved' && (
                          <button
                            onClick={() => handleStatusUpdate(rental.id, 'completed')}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                          >
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Chat Modal for selected rental */}
        {selectedChatListing && (
          <ChatModal
            listing={selectedChatListing}
            isOpen={!!selectedChatListing}
            onClose={() => setSelectedChatListing(null)}
          />
        )}
      </div>
    </div>
  );
};

export default RentalsPage;