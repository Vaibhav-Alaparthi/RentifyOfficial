export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: 'hour' | 'day' | 'week';
  location: string;
  category: 'sports' | 'tools' | 'electronics' | 'other';
  condition: 'like new' | 'good' | 'fair';
  images: string[];
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  created_at: string;
}

export interface Rental {
  id: string;
  listing_id: string;
  renter_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  listing_id: string;
  reviewer_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}