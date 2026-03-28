'use client';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form.name, form.email, form.password, form.phone);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-3xl font-serif text-rose-600 mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" required />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" required />
        <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" required />
        <button type="submit" className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-semibold">Create Account</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">Already have an account? <Link href="/auth/login" className="text-rose-500 hover:underline">Login</Link></p>
    </div>
  );
}
