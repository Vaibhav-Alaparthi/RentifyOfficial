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

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  listing_id: string;
  content: string;
  created_at: string;
  read: boolean;
}

interface Conversation {
  id: string;
  listing_id: string;
  participant1_id: string;
  participant2_id: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
}

export class LocalStorageAuth {
  private static USERS_KEY = 'rentease_users';
  private static CURRENT_USER_KEY = 'rentease_current_user';
  private static LISTINGS_KEY = 'rentease_listings';
  private static RENTALS_KEY = 'rentease_rentals';
  private static MESSAGES_KEY = 'rentease_messages';
  private static CONVERSATIONS_KEY = 'rentease_conversations';

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

  static updateListing(id: string, updates: Partial<Omit<Listing, 'id' | 'created_at' | 'owner_id'>>): Listing | null {
    const listings = this.getListings();
    const listingIndex = listings.findIndex(listing => listing.id === id);
    
    if (listingIndex === -1) return null;
    
    listings[listingIndex] = {
      ...listings[listingIndex],
      ...updates
    };
    
    this.saveListings(listings);
    return listings[listingIndex];
  }

  static deleteListing(id: string): boolean {
    const listings = this.getListings();
    const listingIndex = listings.findIndex(listing => listing.id === id);
    
    if (listingIndex === -1) return false;
    
    // Remove the listing
    listings.splice(listingIndex, 1);
    this.saveListings(listings);
    
    // Clean up related data
    this.deleteListingRelatedData(id);
    
    return true;
  }

  private static deleteListingRelatedData(listingId: string): void {
    // Delete related rentals
    const rentals = this.getRentals();
    const filteredRentals = rentals.filter(rental => rental.listing_id !== listingId);
    this.saveRentals(filteredRentals);
    
    // Delete related messages
    const messages = this.getMessages();
    const filteredMessages = messages.filter(message => message.listing_id !== listingId);
    this.saveMessages(filteredMessages);
    
    // Delete related conversations
    const conversations = this.getConversations();
    const filteredConversations = conversations.filter(conv => conv.listing_id !== listingId);
    this.saveConversations(filteredConversations);
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

  // Message methods
  static getMessages(): Message[] {
    const messages = localStorage.getItem(this.MESSAGES_KEY);
    return messages ? JSON.parse(messages) : [];
  }

  static saveMessages(messages: Message[]): void {
    localStorage.setItem(this.MESSAGES_KEY, JSON.stringify(messages));
  }

  static createMessage(message: Omit<Message, 'id' | 'created_at' | 'read'>): Message {
    const messages = this.getMessages();
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      read: false
    };
    
    messages.push(newMessage);
    this.saveMessages(messages);
    
    // Update or create conversation
    this.updateConversation(message.sender_id, message.receiver_id, message.listing_id, message.content);
    
    return newMessage;
  }

  static getMessagesByConversation(userId1: string, userId2: string, listingId: string): Message[] {
    const messages = this.getMessages();
    return messages.filter(message => 
      message.listing_id === listingId &&
      ((message.sender_id === userId1 && message.receiver_id === userId2) ||
       (message.sender_id === userId2 && message.receiver_id === userId1))
    ).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  static markMessagesAsRead(userId: string, otherUserId: string, listingId: string): void {
    const messages = this.getMessages();
    const updatedMessages = messages.map(message => {
      if (message.listing_id === listingId && 
          message.sender_id === otherUserId && 
          message.receiver_id === userId) {
        return { ...message, read: true };
      }
      return message;
    });
    this.saveMessages(updatedMessages);
  }

  // Conversation methods
  static getConversations(): Conversation[] {
    const conversations = localStorage.getItem(this.CONVERSATIONS_KEY);
    return conversations ? JSON.parse(conversations) : [];
  }

  static saveConversations(conversations: Conversation[]): void {
    localStorage.setItem(this.CONVERSATIONS_KEY, JSON.stringify(conversations));
  }

  static updateConversation(userId1: string, userId2: string, listingId: string, lastMessage: string): void {
    const conversations = this.getConversations();
    const existingIndex = conversations.findIndex(conv => 
      conv.listing_id === listingId &&
      ((conv.participant1_id === userId1 && conv.participant2_id === userId2) ||
       (conv.participant1_id === userId2 && conv.participant2_id === userId1))
    );

    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      conversations[existingIndex].last_message = lastMessage;
      conversations[existingIndex].last_message_at = now;
    } else {
      const newConversation: Conversation = {
        id: crypto.randomUUID(),
        listing_id: listingId,
        participant1_id: userId1,
        participant2_id: userId2,
        last_message: lastMessage,
        last_message_at: now,
        created_at: now
      };
      conversations.push(newConversation);
    }

    this.saveConversations(conversations);
  }

  static getConversationsByUser(userId: string): Conversation[] {
    const conversations = this.getConversations();
    return conversations.filter(conv => 
      conv.participant1_id === userId || conv.participant2_id === userId
    ).sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime());
  }

  static getUserById(id: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.id === id) || null;
  }
}