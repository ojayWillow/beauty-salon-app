'use client';
import { useState, useEffect } from 'react';
import API from '../../lib/api';
import { useCart } from '../../context/CartContext';

export default function StorePage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const { addToCart } = useCart();

  const categories = ['skincare', 'haircare', 'makeup', 'nails', 'other'];

  useEffect(() => {
    API.get(`/products${category ? `?category=${category}` : ''}`)
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, [category]);

  return (
    <div>
      <h1 className="text-3xl font-serif text-rose-600 mb-6">Our Store</h1>
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setCategory('')} className={`px-4 py-1 rounded-full border ${!category ? 'bg-rose-500 text-white' : 'border-rose-300 text-rose-500'}`}>All</button>
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`px-4 py-1 rounded-full border capitalize ${category === c ? 'bg-rose-500 text-white' : 'border-rose-300 text-rose-500'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition">
            <div className="bg-rose-100 h-40 rounded-xl mb-3 flex items-center justify-center text-4xl">💄</div>
            <h3 className="font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-rose-600 font-bold">${product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)} className="bg-rose-500 text-white text-sm px-3 py-1 rounded-full hover:bg-rose-600">Add to Cart</button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className="text-gray-400 col-span-4 text-center py-10">No products found.</p>}
      </div>
    </div>
  );
}
