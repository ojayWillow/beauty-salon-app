'use client';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-2xl shadow">
      <h2 className="text-3xl font-serif text-rose-600 mb-6 text-center">Welcome Back</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" required />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" required />
        <button type="submit" className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-semibold">Login</button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">Don't have an account? <Link href="/auth/register" className="text-rose-500 hover:underline">Register</Link></p>
    </div>
  );
}
