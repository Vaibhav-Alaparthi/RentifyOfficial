import { Item } from '../types';

export const items: Item[] = [
  {
    id: '1',
    title: 'Soccer Ball',
    description: 'Nike soccer ball, size 5, barely used',
    price: 5,
    priceUnit: 'day',
    location: 'Seattle, WA',
    category: 'sports',
    condition: 'good',
    images: ['https://images.pexels.com/photos/3448250/pexels-photo-3448250.jpeg'],
    owner: 'John D.'
  },
  {
    id: '2',
    title: 'Mountain Bike',
    description: 'Trek mountain bike, perfect for trails',
    price: 20,
    priceUnit: 'day',
    location: 'Seattle, WA',
    category: 'sports',
    condition: 'like new',
    images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg'],
    owner: 'Sarah M.'
  },
  {
    id: '3',
    title: 'Power Drill',
    description: 'DeWalt cordless drill with two batteries',
    price: 15,
    priceUnit: 'day',
    location: 'Bellevue, WA',
    category: 'tools',
    condition: 'good',
    images: ['https://images.pexels.com/photos/834892/pexels-photo-834892.jpeg'],
    owner: 'Mike R.'
  }
];