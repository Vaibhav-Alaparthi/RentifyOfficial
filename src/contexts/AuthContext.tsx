/*
  Ayush Vupalanchi, Vaibhav Alaparthi, Hiruna Devadithya
  6/7/25

  This file provides an authentication context for managing user state and authentication methods in the renting marketplace website using React Context API.
*/
// AuthContext provides authentication state and methods to the app using React Context API.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageAuth } from '../lib/localStorage';

// User type represents an authenticated user.
interface User {
  id: string;
  email: string;
  createdAt: string;
}

// AuthContextType defines the shape of the authentication context.
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps the app and provides authentication state and actions
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const currentUser = LocalStorageAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  // Handles user sign up
  const signUp = async (email: string, password: string) => {
    try {
      const newUser = await LocalStorageAuth.signUp(email, password);
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  // Handles user sign in
  const signIn = async (email: string, password: string) => {
    try {
      const user = await LocalStorageAuth.signIn(email, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  // Handles user sign out
  const signOut = async () => {
    try {
      await LocalStorageAuth.signOut();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
