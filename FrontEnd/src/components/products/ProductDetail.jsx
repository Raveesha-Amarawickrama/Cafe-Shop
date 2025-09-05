import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';
import serverURL from "../../serverURL.js";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to load product');
            navigate('/products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        setAdding(true);
        try {
            const success = await addToCart(product._id, quantity);
            if (success) {
                // Reset quantity after successful add
                setQuantity(1);
            }
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/products')}
                className="mb-6 text-amber-600 hover:text-amber-700 flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Menu
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>

                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-6">{product.description}</p>

                    <div className="mb-6">
                        <span className="text-3xl font-bold text-amber-600">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </span>
                    </div>

                    {product.inStock ? (
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <label htmlFor="quantity" className="text-gray-700 font-medium">
                                    Quantity:
                                </label>
                                <div className="flex items-center border rounded">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-16 text-center border-x py-2"
                                        min="1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={adding}
                                className="w-full md:w-auto px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
                            >
                                {adding ? 'Adding to Cart...' : 'Add to Cart'}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            This item is currently out of stock
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;