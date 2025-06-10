/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/9/25

  This file provides the main navigation bar for the renting marketplace website, including links and user actions.
*/
// Navbar component provides the main navigation bar for the app, including links and user actions.
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Plus, User, LogOut, Calendar, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Main Navbar component
const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Handles user sign out and redirects to home
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Home Link */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Rentify</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {/* Browse Items Link */}
            <Link 
              to="/listings" 
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Browse Items
            </Link>
            
            {user ? (
              <>
                {/* Messages Link */}
                <Link 
                  to="/messages" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Messages</span>
                </Link>

                {/* My Rentals Link */}
                <Link 
                  to="/rentals" 
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 font-medium"
                >
                  <Calendar className="h-4 w-4" />
                  <span>My Rentals</span>
                </Link>
                
                {/* Create Listing Button */}
                <Link 
                  to="/create-listing" 
                  className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>List Item</span>
                </Link>
                
                {/* User Info and Sign Out */}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              // Sign In Button
              <Link 
                to="/auth" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;