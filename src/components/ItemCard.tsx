import React from 'react';
import { Item } from '../types';
import { Link } from 'react-router-dom';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className="block border rounded-lg p-4 hover:shadow-md">
      <img 
        src={item.images[0]} 
        alt={item.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
      <p className="text-gray-600 mb-2">{item.location}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold">${item.price}/{item.priceUnit}</span>
        <span className="text-sm text-gray-500">{item.condition}</span>
      </div>
    </Link>
  );
};

export default ItemCard;