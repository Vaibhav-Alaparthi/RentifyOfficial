import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Rent Items From Your Neighbors
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Find sports equipment, tools, and more at friendly prices
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/listings"
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
              <span>Browse Items</span>
            </Link>
            
            {user ? (
              <Link 
                to="/create-listing"
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400"
              >
                <Plus className="h-5 w-5" />
                <span>List Your Item</span>
              </Link>
            ) : (
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

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Items</h3>
              <p className="text-gray-600">Browse available items in your area</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Items</h3>
              <p className="text-gray-600">Rent out items you're not using</p>
            </div>
            
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