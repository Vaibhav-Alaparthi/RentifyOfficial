<<<<<<< HEAD
# RentifyOfficial
=======
# RentEase Marketplace

A peer-to-peer rental marketplace built with React, TypeScript, and local storage for data persistence.

## Features

- **User Authentication** - Sign up and sign in with email/password
- **Item Listings** - Create, browse, and search rental items
- **Rental System** - Request rentals with date selection and pricing
- **Real-time Messaging** - Chat with item owners and renters
- **Rental Management** - Approve/reject requests and track rental status
- **Responsive Design** - Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Data Storage**: Local Storage (no backend required)
- **Build Tool**: Vite

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rentease-marketplace.git
   cd rentease-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ChatModal.tsx   # Real-time chat interface
│   ├── ListingCard.tsx # Item listing display
│   ├── Navbar.tsx      # Navigation header
│   └── RentalModal.tsx # Rental request form
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication state management
├── lib/               # Utility libraries
│   └── localStorage.ts # Local storage data management
├── pages/             # Main application pages
│   ├── AuthPage.tsx           # Sign in/up page
│   ├── CreateListingPage.tsx  # Create new listing
│   ├── HomePage.tsx           # Landing page
│   ├── ListingDetailPage.tsx  # Individual listing view
│   ├── ListingsPage.tsx       # Browse all listings
│   ├── MessagesPage.tsx       # View all conversations
│   └── RentalsPage.tsx        # Manage rental requests
├── types/             # TypeScript type definitions
│   └── index.ts       # Shared interfaces
└── App.tsx            # Main application component
```

## Features Overview

### Authentication
- Local storage-based user management
- Email/password authentication
- Persistent login sessions

### Listings
- Create listings with images, pricing, and details
- Browse and search available items
- Filter by category and search terms
- Detailed item pages with image galleries

### Rental System
- Date-based rental requests
- Automatic price calculation
- Owner approval/rejection workflow
- Rental status tracking

### Messaging
- Real-time chat between users
- Conversation history
- Unread message indicators
- Message timestamps

### Data Persistence
All data is stored locally in the browser using localStorage:
- User accounts and authentication
- Item listings and details
- Rental requests and status
- Messages and conversations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
>>>>>>> b-renting-marketplace/main
