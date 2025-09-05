import { useAuth0 } from "@auth0/auth0-react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const { cartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 13a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2zm4 4a1 1 0 110-2 1 1 0 010 2zm0-4a1 1 0 110-2 1 1 0 010 2z"/>
                        </svg>
                        <span className="text-xl font-bold text-gray-800">Cafe Core</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-amber-600 transition">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-amber-600 transition">Menu</Link>
                        <Link to="/cart" className="relative text-gray-600 hover:text-amber-600 transition">
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="text-gray-600 hover:text-amber-600 transition">
                                    Profile
                                </Link>
                                <span className="text-gray-600">Hi, {user?.name || user?.email}</span>
                                <button
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => loginWithRedirect()}
                                    className="text-gray-600 hover:text-amber-600 transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                                    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </nav>

                    {/* Mobile menu toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t flex flex-col space-y-4">
                        <Link to="/" className="text-gray-600 hover:text-amber-600 transition">Home</Link>
                        <Link to="/products" className="text-gray-600 hover:text-amber-600 transition">Menu</Link>
                        <Link to="/cart" className="text-gray-600 hover:text-amber-600 transition">
                            Cart
                            {cartCount > 0 && (
                                <span className="ml-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="text-gray-600 hover:text-amber-600 transition">
                                    Profile
                                </Link>
                                <span className="text-gray-600">Hi, {user?.name || user?.email}</span>
                                <button
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => loginWithRedirect()}
                                    className="text-gray-600 hover:text-amber-600 transition"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => loginWithRedirect({ screen_hint: "signup" })}
                                    className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;