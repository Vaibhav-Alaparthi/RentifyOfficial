/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/9/25

  This file provides a modal interface for users to rent a listing by selecting dates and submitting a rental request in the renting marketplace website.
*/
import React, { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';
import { LocalStorageAuth } from '../lib/localStorage';
import { useAuth } from '../contexts/AuthContext';

// RentalModal component provides a modal for users to rent a listing by selecting dates and submitting a rental request.
interface Listing {
  id: string;
  title: string;
  price: number;
  price_unit: string;
  owner_id: string;
}

// Props for RentalModal: listing info, modal state, close handler, and rental creation callback.
interface RentalModalProps {
  listing: Listing;
  isOpen: boolean;
  onClose: () => void;
  onRentalCreated: () => void;
}

// Main RentalModal component
const RentalModal: React.FC<RentalModalProps> = ({ listing, isOpen, onClose, onRentalCreated }) => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculates the total price based on selected dates and price unit
  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    
    let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (days === 0) days = 1; // Minimum 1 day
    
    let multiplier = days;
    if (listing.price_unit === 'hour') {
      multiplier = days * 24; // Convert days to hours
    } else if (listing.price_unit === 'week') {
      multiplier = Math.ceil(days / 7); // Convert days to weeks
    }
    
    return listing.price * multiplier;
  };

  // Handles rental form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      if (!startDate || !endDate) {
        throw new Error('Please select both start and end dates');
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start >= end) {
        throw new Error('End date must be after start date');
      }

      if (start < new Date()) {
        throw new Error('Start date cannot be in the past');
      }

      const totalPrice = calculateTotalPrice();

      LocalStorageAuth.createRental({
        listing_id: listing.id,
        renter_id: user.id,
        owner_id: listing.owner_id,
        start_date: startDate,
        end_date: endDate,
        status: 'pending',
        total_price: totalPrice
      });

      onRentalCreated();
      onClose();
      
      // Reset form
      setStartDate('');
      setEndDate('');
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // If modal is not open, render nothing
  if (!isOpen) return null;

  const totalPrice = calculateTotalPrice();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Rent {listing.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Rental Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {startDate && endDate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center text-blue-800">
                <DollarSign className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  Total Price: ${totalPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Based on ${listing.price}/{listing.price_unit}
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !startDate || !endDate}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Request Rental'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentalModal;