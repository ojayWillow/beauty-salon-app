'use client';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) return router.push('/auth/login');
    try {
      await API.post('/orders', {
        items: cart.map((item) => ({ product: item._id, quantity: item.quantity, price: item.price })),
        totalAmount: cartTotal,
        shippingAddress: user.address || 'To be provided'
      });
      clearCart();
      alert('Order placed successfully!');
      router.push('/');
    } catch (err) {
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-serif text-rose-600 mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-400 text-center py-16">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow">
              <div className="bg-rose-100 w-16 h-16 rounded-xl flex items-center justify-center text-2xl">💄</div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-rose-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-7 h-7 rounded-full border flex items-center justify-center">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-7 h-7 rounded-full border flex items-center justify-center">+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600">✕</button>
            </div>
          ))}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span className="text-rose-600">${cartTotal.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 transition font-semibold">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}
