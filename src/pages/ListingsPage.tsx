// ListingsPage displays all available rental listings with search and filter functionality.
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { LocalStorageAuth } from '../lib/localStorage';
import ListingCard from '../components/ListingCard';

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

// Main ListingsPage component
const ListingsPage: React.FC = () => {
  // State for all listings
  const [listings, setListings] = useState<Listing[]>([]);
  // Loading state for data fetch
  const [loading, setLoading] = useState(true);
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // States for available filter options
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);

  // Fetch listings on mount
  useEffect(() => {
    fetchListings();
  }, []);

  // Update available filter options when listings change
  useEffect(() => {
    updateAvailableLocations();
  }, [listings]);

  // Fetch all listings from local storage
  const fetchListings = () => {
    try {
      const allListings = LocalStorageAuth.getListings();
      setListings(allListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update available cities, states, and countries for filters
  const updateAvailableLocations = () => {
    const cities = new Set<string>();
    const states = new Set<string>();
    const countries = new Set<string>();

    listings.forEach(listing => {
      if (listing.city) cities.add(listing.city);
      if (listing.state) states.add(listing.state);
      if (listing.country) countries.add(listing.country);
    });

    setAvailableCities(Array.from(cities).sort());
    setAvailableStates(Array.from(states).sort());
    setAvailableCountries(Array.from(countries).sort());
  };

  // Filter listings based on search and selected filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || listing.category === selectedCategory;
    const matchesCity = !selectedCity || listing.city === selectedCity;
    const matchesState = !selectedState || listing.state === selectedState;
    const matchesCountry = !selectedCountry || listing.country === selectedCountry;
    
    return matchesSearch && matchesCategory && matchesCity && matchesState && matchesCountry;
  });

  // Clear all filters and search
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedState('');
    setSelectedCountry('');
    setSearchTerm('');
  };

  // Check if any filters or search are active
  const hasActiveFilters = selectedCategory || selectedCity || selectedState || selectedCountry || searchTerm;

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Items Near You</h1>
          
          {/* Search Bar and Filters Button */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                showFilters || hasActiveFilters
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-white text-blue-600 text-xs px-2 py-1 rounded-full">
                  {[selectedCategory, selectedCity, selectedState, selectedCountry, searchTerm].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filter Results</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear all</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    <option value="sports">Sports & Recreation</option>
                    <option value="tools">Tools & Equipment</option>
                    <option value="electronics">Electronics</option>
                    <option value="outdoor">Outdoor & Camping</option>
                    <option value="automotive">Automotive</option>
                    <option value="home">Home & Garden</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      // Clear state and city when country changes
                      if (e.target.value !== selectedCountry) {
                        setSelectedState('');
                        setSelectedCity('');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Countries</option>
                    {availableCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* State Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      // Clear city when state changes
                      if (e.target.value !== selectedState) {
                        setSelectedCity('');
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={selectedCountry && availableStates.length === 0}
                  >
                    <option value="">All States</option>
                    {availableStates
                      .filter(state => !selectedCountry || listings.some(l => l.state === state && l.country === selectedCountry))
                      .map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                  </select>
                </div>

                {/* City Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={(selectedState && availableCities.length === 0) || (selectedCountry && availableCities.length === 0)}
                  >
                    <option value="">All Cities</option>
                    {availableCities
                      .filter(city => {
                        if (!selectedState && !selectedCountry) return true;
                        return listings.some(l => 
                          l.city === city && 
                          (!selectedState || l.state === selectedState) &&
                          (!selectedCountry || l.country === selectedCountry)
                        );
                      })
                      .map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCountry && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedCountry}
                  <button
                    onClick={() => setSelectedCountry('')}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedState && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedState}
                  <button
                    onClick={() => setSelectedState('')}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCity && (
                <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedCity}
                  <button
                    onClick={() => setSelectedCity('')}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredListings.length} of {listings.length} items
            {hasActiveFilters && ' matching your filters'}
          </div>
        </div>

        {/* Listings Grid or Empty State */}
        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-4">
              {hasActiveFilters ? 'No items found matching your filters' : 'No items found'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters to see all items
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render a card for each filtered listing */}
            {filteredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;