import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-5xl font-serif text-rose-600 mb-4">Welcome to Luxe Beauty</h1>
      <p className="text-gray-600 text-lg mb-8">Premium beauty services & products, crafted for you.</p>
      <div className="flex justify-center gap-4">
        <Link href="/store" className="bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition">Shop Now</Link>
        <Link href="/services" className="border border-rose-500 text-rose-500 px-6 py-3 rounded-full hover:bg-rose-50 transition">Our Services</Link>
      </div>
    </div>
  );
}
