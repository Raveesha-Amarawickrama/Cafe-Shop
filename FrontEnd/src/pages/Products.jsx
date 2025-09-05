// src/pages/Products.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import serverURL from "../serverURL.js";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { value: 'all', label: 'All Items' },
        { value: 'coffee', label: 'Coffee' },
        { value: 'tea', label: 'Tea' },
        { value: 'pastry', label: 'Pastries' },
        { value: 'sandwich', label: 'Sandwiches' },
        { value: 'dessert', label: 'Desserts' }
    ];

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            const url = selectedCategory === 'all'
                ? `${serverURL}/api/products`
                : `${serverURL}/api/products?category=${selectedCategory}`;

            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(category => (
                    <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`px-6 py-2 rounded-full transition ${
                            selectedCategory === category.value
                                ? 'bg-amber-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;