import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeItem, clearCart }) => {
    // Fallback values if cart or cart.items is undefined
    const items = cart?.items || [];

    return (
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
                {items.length > 0 ? (
                    items.map((item) => {
                        const price = Number(item?.product?.price ?? 0);
                        const quantity = item?.quantity ?? 0;
                        const itemTotal = price * quantity;

                        return (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 pb-4 border-b"
                            >
                                <img
                                    src={item?.product?.image || "/placeholder.png"}
                                    alt={item?.product?.name || "Product"}
                                    className="w-24 h-24 object-cover rounded"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {item?.product?.name || "Unnamed Product"}
                                    </h3>
                                    <p className="text-gray-600">${price.toFixed(2)} each</p>

                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center border rounded">
                                            <button
                                                onClick={() => updateQuantity(item._id, quantity - 1)}
                                                className="px-2 py-1 hover:bg-gray-100"
                                                disabled={quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-1">{quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, quantity + 1)}
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
                                    <p className="font-semibold text-lg">${itemTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-500 text-center py-8">Your cart is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Cart;
