// src/components/products/ProductCard.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        setAdding(true);
        try {
            const success = await addToCart(product._id, 1);
            if (success) {
                // Toast is already shown in addToCart function
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart');
        } finally {
            setAdding(false);
        }
    };

    return (
        <Link to={`/products/${product._id}`} className="block h-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 h-full flex flex-col">
                <div className="h-48 overflow-hidden flex-shrink-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
                        <button
                            onClick={handleAddToCart}
                            disabled={adding || !product.inStock}
                            className={`px-4 py-2 rounded transition ${
                                product.inStock
                                    ? 'bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {adding ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;