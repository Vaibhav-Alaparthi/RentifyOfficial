/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/9/25

  This file defines the main landing page for the Rentify app in the renting marketplace website, featuring a hero section and a features section to introduce users to the platform.
*/

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// HomePage component: Renders the main homepage UI
const HomePage: React.FC = () => {
  // Get the current authenticated user from context
  const { user } = useAuth();

  return (
    <div className="pt-16">
      {/* Hero Section: Main call-to-action area with headline and action buttons */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Rent Items From Your Neighbors
          </h1>
          {/* Subheading */}
          <p className="text-xl mb-8 text-blue-100">
            Find sports equipment, tools, and more at friendly prices
          </p>
          
          {/* Action buttons: Browse or List Item, depending on auth state */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/listings"
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
            >
              {/* Browse Items button with search icon */}
              <Search className="h-5 w-5" />
              <span>Browse Items</span>
            </Link>
            
            {user ? (
              // If logged in, show List Your Item button linking to create-listing
              <Link 
                to="/create-listing"
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400"
              >
                <Plus className="h-5 w-5" />
                <span>List Your Item</span>
              </Link>
            ) : (
              // If not logged in, show List Your Item button linking to auth page
              <Link 
                to="/auth"
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400"
              >
                <Plus className="h-5 w-5" />
                <span>List Your Item</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section: Explains how the platform works */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Find Items */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Items</h3>
              <p className="text-gray-600">Browse available items in your area</p>
            </div>
            
            {/* Feature 2: List Items */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Items</h3>
              <p className="text-gray-600">Rent out items you're not using</p>
            </div>
            
            {/* Feature 3: Connect */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Message owners and arrange pickup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;