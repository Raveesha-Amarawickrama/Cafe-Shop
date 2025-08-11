// controllers/cartController.js
const Cart = require('../models/Cart');

const cartController = {
    // Get user's cart
    getCart: async (req, res) => {
        try {
            let cart = await Cart.findOne({ user: req.userId }) //
                .populate('items.product');// Go into each items array element, look at product, find it in the Product collection, and replace the ID with the full document.

            if (!cart) { //
                cart = await Cart.create({ user: req.userId, items: [] });
            }

            await cart.calculateTotal(); // Calculate total amount in the cart
            await cart.save();// Save the cart after calculating the total

            res.json(cart); // Return the cart
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Add item to cart
    addToCart: async (req, res) => {
        try {
            const { productId, quantity = 1 } = req.body; // Ensure productId and quantity are provided

            let cart = await Cart.findOne({ user: req.userId });// Find the cart for the user
            // If no cart exists, create a new one

            if (!cart) {
                cart = await Cart.create({ user: req.userId, items: [] });
            }
 
            const existingItemIndex = cart.items.findIndex( // Check if the product already exists in the cart
                item => item.product.toString() === productId //
            );

            if (existingItemIndex > -1) { // If the product exists, update the quantity
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity }); // If the product does not exist, add it to the cart
            }

            await cart.save();// Save the cart after adding the item
            await cart.populate('items.product');// Populate the product details in the cart items
            await cart.calculateTotal();// Calculate the total amount in the cart
            await cart.save();//    Save the cart after calculating the total

            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Update item quantity
    updateCartItem: async (req, res) => {
        try {
            const { quantity } = req.body; // Ensure quantity is provided 

            const cart = await Cart.findOne({ user: req.userId }); // Find the cart for the user
            if (!cart) {  // If no cart exists, return an error
                return res.status(404).json({ message: 'Cart not found' });
            }

            const item = cart.items.id(req.params.itemId); // Find the item in the cart by itemId
            if (!item) {
                return res.status(404).json({ message: 'Item not found' });
            }

            if (quantity === 0) { // If quantity is 0, remove the item from the cart
                item.remove();// Remove the item from the cart
            } else { // If quantity is provided, update the item's quantity
                item.quantity = quantity; // Update the item's quantity
            }

            await cart.save();
            await cart.populate('items.product');
            await cart.calculateTotal();
            await cart.save();

            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Remove item from cart
    removeFromCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.userId }); // Find the cart for the user
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items.pull(req.params.itemId); // Remove the item from the cart by itemId

            await cart.save(); // Save the cart after removing the item
            await cart.populate('items.product');
            await cart.calculateTotal();
            await cart.save(); // Save the cart after calculating the total

            res.json(cart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Clear cart
    clearCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.userId }); // Find the cart for the user
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = [];// Clear all items in the cart
            cart.totalAmount = 0;// Reset the total amount to 0
            await cart.save();// Save the cart after clearing it    

            res.json(cart);
        } catch (error) { // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = cartController;