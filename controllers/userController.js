// back-end/controllers/userController.js
const User = require('../models/User');

const userController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password').sort({createdAt: -1}); // Find all users, exclude password field, and sort by creation date in descending order
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Update user role
    updateUserRole: async (req, res) => {
        try {
            const {role} = req.body;// Ensure role is provided

            // Validate role
            if (!['customer', 'admin'].includes(role)) {
                return res.status(400).json({message: 'Invalid role'});
            }

            // Prevent user from changing their own role
            if (req.params.id === req.userId) {
                return res.status(403).json({message: 'Cannot change your own role'});
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            user.role = role; // Update the user's role
            await user.save();

            res.json({message: 'User role updated successfully', user: user});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            // Prevent user from deleting themselves
            if (req.params.id === req.userId) {
                return res.status(403).json({message: 'Cannot delete your own account'});
            }

            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }

            // Also delete user's cart
            const Cart = require('../models/Cart');
            await Cart.deleteOne({user: req.params.id});

            await user.deleteOne();

            res.json({message: 'User deleted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    }
};

module.exports = userController;