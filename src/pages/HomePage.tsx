import React from 'react';
<<<<<<< HEAD
import { items } from '../data/items';
import ItemCard from '../components/ItemCard';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Rent Stuff From Your Neighbors</h1>
        <p className="text-gray-600">Find sports equipment, tools, and more at friendly prices</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Available Items</h2>
          <Link to="/items" className="text-blue-500 hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link 
          to="/list-item"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          List Your Item
        </Link>
=======
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
>>>>>>> b-renting-marketplace/main
      </div>
    </div>
  );
};

export default HomePage;