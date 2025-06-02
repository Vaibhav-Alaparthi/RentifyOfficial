export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: 'hour' | 'day' | 'week';
  location: string;
  category: 'sports' | 'tools' | 'electronics' | 'other';
  condition: 'like new' | 'good' | 'fair';
  images: string[];
  owner: string;
}