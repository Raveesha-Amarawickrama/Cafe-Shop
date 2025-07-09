// back-end/middleware/adminAuth.js
const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({message: 'Access denied. Admin only.'});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({message: 'Access denied'});
    }
};

module.exports = adminAuth;