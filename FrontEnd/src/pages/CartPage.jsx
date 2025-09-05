import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from '../components/cart/Cart';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart, fetchCart } = useCart();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Compute totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * (item.quantity ?? 0), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    useEffect(() => {
        const loadCart = async () => {
            await fetchCart();
            setLoading(false);
        };
        loadCart();
    }, []);

    const handleCheckout = () => {
        navigate('/checkout'); // Go to separate checkout page
    };

    if (loading) return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length > 0 ? (
                <div className="md:flex md:gap-8">
                    {/* Cart Items */}
                    <div className="md:flex-1">
                        <Cart
                            cart={{ items: cartItems }}
                            updateQuantity={updateQuantity}
                            removeItem={removeFromCart}
                            clearCart={clearCart}
                        />
                    </div>

                    {/* Order Summary */}
                    <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow mt-6 md:mt-0">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <p className="mb-2">Total Items: {cartItems.length}</p>
                        <p className="mb-2">Subtotal: ${subtotal.toFixed(2)}</p>
                        <p className="mb-4">Tax (10%): ${tax.toFixed(2)}</p>
                        <p className="font-semibold text-lg mb-4">Total: ${total.toFixed(2)}</p>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition"
                        >
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/products"
                            className="block text-center text-amber-600 hover:text-amber-700 mt-3"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                    <Link
                        to="/products"
                        className="inline-block bg-amber-600 text-white px-6 py-3 rounded hover:bg-amber-700 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CartPage;
