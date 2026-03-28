'use client';
import { useState, useEffect } from 'react';
import API from '../../lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get('/services').then((res) => setServices(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif text-rose-600 mb-6">Our Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <div className="text-4xl mb-3">💅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{service.name}</h3>
            <p className="text-gray-500 text-sm mb-3">{service.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-rose-600 font-bold">${service.price}</span>
              <span className="text-gray-400">{service.duration} min</span>
            </div>
          </div>
        ))}
        {services.length === 0 && <p className="text-gray-400 col-span-3 text-center py-10">No services listed yet.</p>}
      </div>
    </div>
  );
}
