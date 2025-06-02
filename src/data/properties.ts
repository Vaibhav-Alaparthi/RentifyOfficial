import { Property } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'A beautiful modern apartment in the heart of downtown with stunning city views. This newly renovated space offers luxury living with premium finishes and state-of-the-art appliances. Walking distance to restaurants, shopping, and entertainment.',
    price: 150,
    priceUnit: 'day',
    location: 'New York, NY',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    amenities: ['WiFi', 'Air Conditioning', 'Full Kitchen', 'Washer/Dryer', 'Gym Access', 'Parking'],
    images: [
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Cozy Mountain Cabin',
    description: 'Escape to this charming cabin nestled in the mountains. Perfect for a relaxing getaway with beautiful natural surroundings. Enjoy hiking trails, nearby lakes, and stunning views right from your doorstep.',
    price: 200,
    priceUnit: 'day',
    location: 'Aspen, CO',
    type: 'cabin',
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    amenities: ['Fireplace', 'Hot Tub', 'WiFi', 'Full Kitchen', 'Mountain Views', 'Hiking Trails'],
    images: [
      'https://images.pexels.com/photos/803975/pexels-photo-803975.jpeg',
      'https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg'
    ],
    featured: true
  },
  {
    id: '3',
    title: 'Beachfront Villa',
    description: 'Luxurious beachfront villa with private access to the beach. Enjoy panoramic ocean views and spectacular sunsets. The perfect place for a memorable vacation with family or friends.',
    price: 500,
    priceUnit: 'day',
    location: 'Miami, FL',
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    amenities: ['Beach Access', 'Pool', 'Hot Tub', 'WiFi', 'Full Kitchen', 'Outdoor Dining'],
    images: [
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      'https://images.pexels.com/photos/32870/pexels-photo.jpg'
    ],
    featured: true
  },
  {
    id: '4',
    title: 'Suburban Family Home',
    description: 'Spacious family home in a quiet suburban neighborhood. Perfect for families looking for a comfortable place to stay with all the amenities of home. Close to parks, schools, and shopping centers.',
    price: 1800,
    priceUnit: 'month',
    location: 'Austin, TX',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2.5,
    area: 2200,
    amenities: ['Backyard', 'Garage', 'WiFi', 'Washer/Dryer', 'Full Kitchen', 'Family Room'],
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    ],
    featured: false
  },
  {
    id: '5',
    title: 'Urban Loft Apartment',
    description: 'Stylish loft apartment in a converted warehouse. High ceilings, exposed brick, and modern amenities create a unique urban living experience. Located in a trendy neighborhood with easy access to nightlife and culture.',
    price: 2200,
    priceUnit: 'month',
    location: 'Chicago, IL',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    amenities: ['WiFi', 'Air Conditioning', 'Washer/Dryer', 'Gym Access', 'Rooftop Deck', 'Bike Storage'],
    images: [
      'https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
    ],
    featured: false
  },
  {
    id: '6',
    title: 'Lakeside Retreat',
    description: 'Peaceful cabin on the shores of a pristine lake. Wake up to beautiful water views and spend your days fishing, swimming, or relaxing on the private dock. A perfect nature getaway.',
    price: 180,
    priceUnit: 'day',
    location: 'Lake Tahoe, CA',
    type: 'cabin',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    amenities: ['Lake Access', 'Dock', 'Kayaks', 'Fireplace', 'Full Kitchen', 'Deck'],
    images: [
      'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg',
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg'
    ],
    featured: false
  }
];