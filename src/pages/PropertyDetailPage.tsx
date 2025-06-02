import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { properties } from '../data/properties';
import { Bed, Bath, Square, MapPin, Calendar, Heart, Share, ArrowLeft } from 'lucide-react';
import { Link } from '../utils/RouterUtils';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  moveInDate: string;
}

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const property = properties.find(p => p.id === id);
  
  const [activeImage, setActiveImage] = useState(0);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in this property and would like to schedule a viewing.`,
    moveInDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  if (!property) {
    return <Navigate to="/properties" />;
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };
  
  return (
    <div className="pt-20 pb-16 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/properties"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to properties
          </Link>
        </div>
        
        {/* Property header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="text-2xl font-bold text-blue-600">
              ${property.price}
              <span className="text-gray-500 text-base font-normal">
                /{property.priceUnit === 'day' ? 'night' : property.priceUnit}
              </span>
            </div>
          </div>
        </div>
        
        {/* Property images */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96 mb-2">
            <img 
              src={property.images[activeImage]} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {property.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-lg overflow-hidden h-24 ${
                    activeImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${property.title} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property details */}
          <div className="lg:col-span-2">
            {/* Key details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <Bed className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Bedrooms</span>
                  <span className="font-semibold text-gray-800">{property.bedrooms}</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <Bath className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Bathrooms</span>
                  <span className="font-semibold text-gray-800">{property.bathrooms}</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <Square className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Area</span>
                  <span className="font-semibold text-gray-800">{property.area} ft²</span>
                </div>
                
                <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 mb-2" />
                  <span className="text-sm text-gray-500">Type</span>
                  <span className="font-semibold text-gray-800 capitalize">{property.type}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Amenities</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="mr-2 text-blue-600">✓</span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Location (Placeholder) */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location</h2>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map would be displayed here</p>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Contact Owner</h2>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-600">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-600">
                    <Share className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md">
                  <h3 className="font-semibold mb-2">Request Sent!</h3>
                  <p className="text-sm">
                    Thank you for your interest. The property owner will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="moveInDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Move-in Date
                      </label>
                      <input
                        type="date"
                        id="moveInDate"
                        name="moveInDate"
                        value={formData.moveInDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                          Sending...
                        </span>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;