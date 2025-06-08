interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  price_unit: string;
  location: string;
  category: string;
  condition: string;
  images: string[];
  owner_id: string;
  created_at: string;
}

interface Rental {
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

export class LocalStorageAuth {
  private static USERS_KEY = 'rentease_users';
  private static CURRENT_USER_KEY = 'rentease_current_user';
  private static LISTINGS_KEY = 'rentease_listings';
  private static RENTALS_KEY = 'rentease_rentals';

  static getUsers(): User[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  static getCurrentUser(): User | null {
    const user = localStorage.getItem(this.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  static signUp(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const users = this.getUsers();
      
      // Check if user already exists
      if (users.find(u => u.email === email)) {
        reject(new Error('User already exists'));
        return;
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      this.saveUsers(users);
      this.setCurrentUser(newUser);
      
      resolve(newUser);
    });
  }

  static signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      const users = this.getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        reject(new Error('Invalid email or password'));
        return;
      }

      this.setCurrentUser(user);
      resolve(user);
    });
  }

  static signOut(): Promise<void> {
    return new Promise((resolve) => {
      this.setCurrentUser(null);
      resolve();
    });
  }

  static getListings(): Listing[] {
    const listings = localStorage.getItem(this.LISTINGS_KEY);
    return listings ? JSON.parse(listings) : [];
  }

  static saveListings(listings: Listing[]): void {
    localStorage.setItem(this.LISTINGS_KEY, JSON.stringify(listings));
  }

  static createListing(listing: Omit<Listing, 'id' | 'created_at'>): Listing {
    const listings = this.getListings();
    const newListing: Listing = {
      ...listing,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };
    
    listings.push(newListing);
    this.saveListings(listings);
    
    return newListing;
  }

  static getListingById(id: string): Listing | null {
    const listings = this.getListings();
    return listings.find(listing => listing.id === id) || null;
  }

  // Rental methods
  static getRentals(): Rental[] {
    const rentals = localStorage.getItem(this.RENTALS_KEY);
    return rentals ? JSON.parse(rentals) : [];
  }

  static saveRentals(rentals: Rental[]): void {
    localStorage.setItem(this.RENTALS_KEY, JSON.stringify(rentals));
  }

  static createRental(rental: Omit<Rental, 'id' | 'created_at' | 'updated_at'>): Rental {
    const rentals = this.getRentals();
    const newRental: Rental = {
      ...rental,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    rentals.push(newRental);
    this.saveRentals(rentals);
    
    return newRental;
  }

  static getRentalsByUser(userId: string): Rental[] {
    const rentals = this.getRentals();
    return rentals.filter(rental => rental.renter_id === userId || rental.owner_id === userId);
  }

  static getRentalsByListing(listingId: string): Rental[] {
    const rentals = this.getRentals();
    return rentals.filter(rental => rental.listing_id === listingId);
  }

  static updateRentalStatus(rentalId: string, status: Rental['status']): Rental | null {
    const rentals = this.getRentals();
    const rentalIndex = rentals.findIndex(rental => rental.id === rentalId);
    
    if (rentalIndex === -1) return null;
    
    rentals[rentalIndex].status = status;
    rentals[rentalIndex].updated_at = new Date().toISOString();
    
    this.saveRentals(rentals);
    return rentals[rentalIndex];
  }

  static getRentalById(id: string): Rental | null {
    const rentals = this.getRentals();
    return rentals.find(rental => rental.id === id) || null;
  }
}