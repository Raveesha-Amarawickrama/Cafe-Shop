// src/components/cart/Cart.jsx
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeItem, clearCart }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Cart Items</h2>
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-700 text-sm"
                        >
                            Clear Cart
                        </button>
                    </div>

                    <div className="space-y-4">
                        {cart.items.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 pb-4 border-b">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                                    <p className="text-gray-600">${item.product.price.toFixed(2)} each</p>

                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="text-red-600 hover:text-red-700 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-lg">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${cart.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax (10%)</span>
                            <span>${(cart.totalAmount * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-3">
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${(cart.totalAmount * 1.1).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition mb-3">
                        Proceed to Checkout
                    </button>

                    <Link
                        to="/products"
                        className="block text-center text-amber-600 hover:text-amber-700"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;