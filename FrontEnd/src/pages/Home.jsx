// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/products/ProductCard';
import serverURL from "../serverURL.js";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/products?featured=true`);
            setFeaturedProducts(response.data);
        } catch (error) {
            console.error('Error fetching featured products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section
                className="relative h-[500px]"
                style={{
                    background: 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200) center/cover no-repeat'
                }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl font-bold mb-4">Welcome to Cafe Core</h1>
                        <p className="text-xl mb-8">Discover the perfect blend of quality coffee and cozy atmosphere</p>
                        <Link to="/products"
                              className="inline-block bg-amber-600 text-white px-8 py-3 rounded-md hover:bg-amber-700 transition text-lg">
                            Explore Our Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                At Café Core, we believe that great coffee brings people together. Since our inception,
                                we've been dedicated to sourcing the finest beans and creating the perfect atmosphere
                                for our community.
                            </p>
                            <p className="text-gray-600">
                                Every cup we serve is crafted with passion and expertise, ensuring that each visit
                                to Café Core is a memorable experience. Join us and discover your new favorite coffee spot.
                            </p>
                        </div>
                        <div className="relative h-96">
                            <img
                                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600"
                                alt="Coffee shop interior"
                                className="rounded-lg shadow-lg w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;