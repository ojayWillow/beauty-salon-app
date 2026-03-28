'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }
    API.get('/orders/my')
      .then((res) => setOrders(res.data))
      .catch(console.error)
      .finally(() => setLoadingOrders(false));
  }, [user, router]);

  const statusColor = (status) => {
    const map = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-600',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-rose-200 flex items-center justify-center text-2xl font-serif text-rose-600">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-serif text-gray-800">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <button
          onClick={() => { logout(); router.push('/'); }}
          className="text-sm text-rose-500 border border-rose-300 px-4 py-2 rounded-full hover:bg-rose-50 transition"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['orders', 'account'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition ${
              activeTab === tab ? 'bg-rose-500 text-white' : 'border border-rose-300 text-rose-500 hover:bg-rose-50'
            }`}
          >
            {tab === 'orders' ? 'My Orders' : 'Account'}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {loadingOrders ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow animate-pulse">
                <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-3">🛍️</p>
              <p className="text-base">No orders yet. Head to the store!</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl shadow p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-mono">#{order._id.slice(-8).toUpperCase()}</span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${statusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {order.items?.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm">
                      <span className="text-gray-700">{item.product?.name || 'Product'} × {item.quantity}</span>
                      <span className="text-gray-500">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-700">Total</span>
                  <span className="text-rose-600 font-bold">${order.totalAmount?.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h2>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Full Name</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50 text-sm">{user.name}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50 text-sm">{user.email}</div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Member Since</label>
            <div className="border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 bg-gray-50 text-sm">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
