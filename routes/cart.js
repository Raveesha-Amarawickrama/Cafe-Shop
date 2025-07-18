// routes/cart.js
const express = require('express');
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// Get user's cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/add', cartController.addToCart);

// Update item quantity
router.put('/update/:itemId', cartController.updateCartItem);

// Remove item from cart
router.delete('/remove/:itemId', cartController.removeFromCart);

// Clear cart
router.delete('/clear', cartController.clearCart);

module.exports = router;