// User type represents an authenticated user in the system.
export interface User {
  id: string;
  email: string;
  createdAt: string;
}

// Listing type represents a rental listing with all its details.
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: 'hour' | 'day' | 'week';
  location: string;
  city?: string;
  state?: string;
  country?: string;
  category: 'sports' | 'tools' | 'electronics' | 'outdoor' | 'automotive' | 'home' | 'other';
  condition: 'like new' | 'good' | 'fair';
  images: string[];
  owner_id: string;
  created_at: string;
}

// Message type represents a chat message between users about a listing.
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

// Rental type represents a rental transaction between users.
export interface Rental {
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

// Conversation type represents a chat conversation between two users about a listing.
export interface Conversation {
  id: string;
  listing_id: string;
  participant1_id: string;
  participant2_id: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
}