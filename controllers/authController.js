// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authController = {
    // Register new user
    register: async (req, res) => { 
        try {
            const {name, email, password} = req.body; // Ensure these fields are provided

            // Check if user exists
            const existingUser = await User.findOne({email});
            if (existingUser) {
                return res.status(400).json({message: 'User already exists'});
            }

            // Create new user (always as customer by default)
            const user = new User({
                name,
                email,
                password,
                role: 'customer' // Explicitly set as customer
            });
            await user.save();

            // Generate JWT
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE || '7d'
            });

            res.status(201).json({ // Created status
                token, // Return the JWT
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const {email, password} = req.body; // Ensure these fields are provided

            // Find user
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'Invalid credentials'});
            }

            // Check password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({message: 'Invalid credentials'});
            }

            // Generate JWT
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE || '7d'
            });

            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Get current user
    getMe: async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password');
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    }
};

module.exports = authController;