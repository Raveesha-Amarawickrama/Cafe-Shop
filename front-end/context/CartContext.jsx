import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext.jsx';
import toast from 'react-hot-toast';
import serverURL from "../serverURL.js";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    // Load cart count from localStorage on mount
    useEffect(() => {
        if (!user) {
            const savedCount = localStorage.getItem('cartCount');
            if (savedCount) {
                setCartCount(parseInt(savedCount));
            }
        }
    }, [user]);

    // Fetch cart when user logs in
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
            setCartCount(0);
            localStorage.setItem('cartCount', '0');
        }
    }, [user]);

    const fetchCart = async () => {
        if (!user) return;
        
        try {
            setLoading(true);
            const response = await axios.get(`${serverURL}/api/cart`);
            setCartItems(response.data.items || []);
            const count = response.data.items.reduce((total, item) => total + item.quantity, 0);
            setCartCount(count);
            localStorage.setItem('cartCount', count.toString());
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCartCount = (items) => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
        localStorage.setItem('cartCount', count.toString());
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return false;
        }

        try {
            const response = await axios.post(`${serverURL}/api/cart/add`, {
                productId,
                quantity
            });
            
            const newItems = response.data.items || [];
            setCartItems(newItems);
            updateCartCount(newItems);
            toast.success('Item added to cart!');
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add item to cart');
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (!user) return;
        
        try {
            const response = await axios.put(`${serverURL}/api/cart/update/${itemId}`, { quantity });
            const newItems = response.data.items || [];
            setCartItems(newItems);
            updateCartCount(newItems);
            toast.success('Cart updated');
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error('Failed to update cart');
        }
    };

    const removeFromCart = async (itemId) => {
        if (!user) return;
        
        try {
            const response = await axios.delete(`${serverURL}/api/cart/remove/${itemId}`);
            const newItems = response.data.items || [];
            setCartItems(newItems);
            updateCartCount(newItems);
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Error removing item:', error);
            toast.error('Failed to remove item');
        }
    };

    const clearCart = async () => {
        if (!user) return;
        
        try {
            await axios.delete(`${serverURL}/api/cart/clear`);
            setCartItems([]);
            setCartCount(0);
            localStorage.setItem('cartCount', '0');
            toast.success('Cart cleared');
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error('Failed to clear cart');
        }
    };

    const value = {
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

