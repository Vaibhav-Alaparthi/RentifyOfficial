/*
  # Initial schema setup for rental marketplace

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text)
      - avatar_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - listings
      - id (uuid)
      - title (text)
      - description (text)
      - price (numeric)
      - price_unit (text)
      - location (text)
      - category (text)
      - condition (text)
      - images (text[])
      - availability (tsrange)
      - owner_id (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)

    - reviews
      - id (uuid)
      - listing_id (uuid, references listings)
      - reviewer_id (uuid, references profiles)
      - rating (integer)
      - comment (text)
      - created_at (timestamp)

    - messages
      - id (uuid)
      - sender_id (uuid, references profiles)
      - receiver_id (uuid, references profiles)
      - listing_id (uuid, references listings)
      - content (text)
      - created_at (timestamp)

    - rentals
      - id (uuid)
      - listing_id (uuid, references listings)
      - renter_id (uuid, references profiles)
      - start_date (timestamp)
      - end_date (timestamp)
      - status (text)
      - payment_status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  price_unit text NOT NULL CHECK (price_unit IN ('hour', 'day', 'week')),
  location text NOT NULL,
  category text NOT NULL CHECK (category IN ('sports', 'tools', 'electronics', 'other')),
  condition text NOT NULL CHECK (condition IN ('like new', 'good', 'fair')),
  images text[] NOT NULL,
  availability tsrange,
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create rentals table
CREATE TABLE IF NOT EXISTS rentals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE NOT NULL,
  renter_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  payment_status text NOT NULL CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Listings policies
CREATE POLICY "Listings are viewable by everyone"
  ON listings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create listings"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete own listings"
  ON listings FOR DELETE
  USING (auth.uid() = owner_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = reviewer_id);

-- Messages policies
CREATE POLICY "Users can view their own messages"
  ON messages FOR SELECT
  USING (auth.uid() IN (sender_id, receiver_id));

CREATE POLICY "Authenticated users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Rentals policies
CREATE POLICY "Users can view rentals they're involved in"
  ON rentals FOR SELECT
  USING (
    auth.uid() IN (
      SELECT owner_id FROM listings WHERE id = listing_id
      UNION
      SELECT renter_id WHERE renter_id = auth.uid()
    )
  );

CREATE POLICY "Authenticated users can create rental requests"
  ON rentals FOR INSERT
  WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Users can update rentals they're involved in"
  ON rentals FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT owner_id FROM listings WHERE id = listing_id
      UNION
      SELECT renter_id WHERE renter_id = auth.uid()
    )
  );