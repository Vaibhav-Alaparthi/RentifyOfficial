// EditListingModal component allows users to edit an existing listing in a modal dialog.
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LocalStorageAuth } from '../lib/localStorage';
import ImageUpload from './ImageUpload';

// Listing interface defines the structure of a rental listing.
interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  location: string;
  city?: string;
  state?: string;
  country?: string;
  category: string;
  condition: string;
  images: string[];
  owner_id: string;
  created_at: string;
}

// Props for EditListingModal: listing to edit, modal state, close handler, and update callback.
interface EditListingModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
  onListingUpdated: (updatedListing: Listing) => void;
}

// Main EditListingModal component
const EditListingModal: React.FC<EditListingModalProps> = ({ 
  listing, 
  isOpen, 
  onClose, 
  onListingUpdated 
}) => {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  // Form state initialized with listing data
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    price: listing.price.toString(),
    price_unit: listing.price_unit,
    city: listing.city || '',
    state: listing.state || '',
    country: listing.country || 'United States',
    category: listing.category,
    condition: listing.condition,
    images: [...listing.images]
  });

  // Handles changes to text, textarea, and select inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handles changes to the images array
  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  // Handles form submission to update the listing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Compose location string from city, state, and country
      const location = `${formData.city}, ${formData.state}, ${formData.country}`;
      
      // Update listing in local storage
      const updatedListing = LocalStorageAuth.updateListing(listing.id, {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        price_unit: formData.price_unit,
        location: location,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        category: formData.category,
        condition: formData.condition,
        images: formData.images
      });

      if (updatedListing) {
        onListingUpdated(updatedListing); // Notify parent of update
        onClose(); // Close modal
      } else {
        throw new Error('Failed to update listing');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Error updating listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Edit Listing</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Edit Listing Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Item Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price and Price Unit Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price_unit" className="block text-sm font-medium text-gray-700 mb-1">
                Price Unit *
              </label>
              <select
                id="price_unit"
                name="price_unit"
                value={formData.price_unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
              </select>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-900 mb-3">Location Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* City Input */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Seattle"
                />
              </div>

              {/* State Input */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State/Province *
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., WA"
                />
              </div>

              {/* Country Input */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category and Condition Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="sports">Sports & Recreation</option>
                <option value="tools">Tools & Equipment</option>
                <option value="electronics">Electronics</option>
                <option value="outdoor">Outdoor & Camping</option>
                <option value="automotive">Automotive</option>
                <option value="home">Home & Garden</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Condition *
              </label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="like new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Images Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Images
            </label>
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              maxImages={5}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;