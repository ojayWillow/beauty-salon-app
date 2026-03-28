import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Beauty Salon',
  description: 'Your premium beauty destination'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-rose-50 min-h-screen font-sans">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
