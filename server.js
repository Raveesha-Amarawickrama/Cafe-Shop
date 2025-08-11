const express = require('express'); // Import express framework
const cors = require('cors');// Import CORS middleware for handling cross-origin requests
const dotenv = require('dotenv');// Import dotenv for environment variable management
const mongodb = require('./database/mongodb');// Import custom MongoDB connection module

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong!'});
});

const PORT = process.env.PORT || 5000;

mongodb.connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});