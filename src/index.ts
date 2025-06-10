export interface User {
  id: string;
  email: string;
  createdAt: string;
}

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

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

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

export interface Conversation {
  id: string;
  listing_id: string;
  participant1_id: string;
  participant2_id: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
}