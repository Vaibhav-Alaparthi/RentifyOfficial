import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import CreateListingPage from './pages/CreateListingPage';
import ListingDetailPage from './pages/ListingDetailPage';
import AuthPage from './pages/AuthPage';
import RentalsPage from './pages/RentalsPage';
import MessagesPage from './pages/MessagesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/create-listing" element={<CreateListingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;