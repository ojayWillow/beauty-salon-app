'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import API from '../../lib/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/services')
      .then((res) => setServices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const durationLabel = (mins) => {
    if (!mins) return '';
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}min` : `${h}h`;
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif text-rose-600 mb-2">Our Services</h1>
        <p className="text-gray-500">Treat yourself to our premium beauty treatments</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow animate-pulse">
              <div className="h-6 bg-rose-100 rounded mb-3 w-2/3" />
              <div className="h-4 bg-gray-100 rounded mb-2" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-4" />
              <div className="h-8 bg-rose-100 rounded-full w-1/3" />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">💅</p>
          <p className="text-lg">No services listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                {service.duration && (
                  <span className="text-xs bg-rose-50 text-rose-500 px-3 py-1 rounded-full">{durationLabel(service.duration)}</span>
                )}
              </div>
              <p className="text-gray-500 text-sm flex-1 mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-rose-600 font-bold text-xl">${service.price?.toFixed(2)}</span>
                <Link
                  href="/auth/login"
                  className="bg-rose-500 text-white text-sm px-4 py-2 rounded-full hover:bg-rose-600 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
