'use client';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../lib/api';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
    if (user) {
      API.get('/orders/myorders').then((res) => setOrders(res.data)).catch(console.error);
    }
  }, [user, loading]);

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif text-rose-600 mb-6">My Profile</h1>
      {user && (
        <div className="bg-white rounded-2xl p-6 shadow mb-8">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-gray-500">{user.email}</p>
          {user.phone && <p className="text-gray-500">{user.phone}</p>}
        </div>
      )}
      <h2 className="text-2xl font-serif text-rose-500 mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Order #{order._id.slice(-6)}</span>
                <span className={`text-sm font-semibold capitalize ${order.status === 'delivered' ? 'text-green-500' : 'text-rose-500'}`}>{order.status}</span>
              </div>
              <p className="font-bold text-rose-600 mt-1">${order.totalAmount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
