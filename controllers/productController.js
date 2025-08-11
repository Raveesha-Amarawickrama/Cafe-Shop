// back-end/controllers/productController.js
const Product = require('../models/Product');

const productController = {
    // Get all products with optional filters
    getAllProducts: async (req, res) => { 
        try {
            const {category, featured} = req.query; // Ensure category and featured filters are applied if provided
            const query = {}; // Initialize an empty query object

            if (category) query.category = category; // If category is provided, filter by category
            if (featured === 'true') query.featured = true; // If featured is true, filter by featured products

            const products = await Product.find(query);// Find products based on the query
            res.json(products);// Return the list of products
        } catch (error) { // Handle any errors that occur during the process
            console.error(error);
            res.status(500).json({message: 'Server error'}); // Return a server error response
        }
    },

    // Get single product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id); // Find product by ID

            if (!product) { // If product not found, return 404
                return res.status(404).json({message: 'Product not found'});
            }

            res.json(product);  // Return the product details
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({message: 'Server error'});
        }
    },

    // Create new product (Admin only)
    createProduct: async (req, res) => {
        try {
            const {name, description, price, category, image, inStock, featured} = req.body; // Ensure these fields are provided

            const product = new Product({ // Create a new product instance
                name,
                description,
                price,
                category,
                image,
                inStock: inStock !== undefined ? inStock : true,
                featured: featured || false
            });

            await product.save();// Save the product to the database
            res.status(201).json(product);// Return the created product with 201 status
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Update product (Admin only)
    updateProduct: async (req, res) => {
        try {
            const {name, description, price, category, image, inStock, featured} = req.body;

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({message: 'Product not found'});
            }

            // Update fields
            if (name !== undefined) product.name = name;
            if (description !== undefined) product.description = description;
            if (price !== undefined) product.price = price;
            if (category !== undefined) product.category = category;
            if (image !== undefined) product.image = image;
            if (inStock !== undefined) product.inStock = inStock;
            if (featured !== undefined) product.featured = featured;

            await product.save();
            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Delete product (Admin only)
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({message: 'Product not found'});
            }

            await product.deleteOne();
            res.json({message: 'Product deleted successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    },

    // Seed products (for development)
    seedProducts: async (req, res) => { //
        try {
            const products = [
                {
                    name: 'Espresso',
                    description: 'Rich and bold espresso shot',
                    price: 2.50,
                    category: 'coffee',
                    image: 'https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400',
                    featured: true
                },
                {
                    name: 'Cappuccino',
                    description: 'Espresso with steamed milk and foam',
                    price: 4.50,
                    category: 'coffee',
                    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
                    featured: true
                },
                {
                    name: 'Latte',
                    description: 'Smooth espresso with steamed milk',
                    price: 5.00,
                    category: 'coffee',
                    image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400'
                },
                {
                    name: 'Americano',
                    description: 'Espresso diluted with hot water',
                    price: 3.50,
                    category: 'coffee',
                    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'
                },
                {
                    name: 'Green Tea',
                    description: 'Refreshing Japanese green tea',
                    price: 3.00,
                    category: 'tea',
                    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'
                },
                {
                    name: 'Earl Grey',
                    description: 'Classic English tea with bergamot',
                    price: 3.50,
                    category: 'tea',
                    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400'
                },
                {
                    name: 'Croissant',
                    description: 'Buttery, flaky French pastry',
                    price: 3.00,
                    category: 'pastry',
                    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
                    featured: true
                },
                {
                    name: 'Chocolate Muffin',
                    description: 'Rich chocolate muffin with chocolate chips',
                    price: 3.50,
                    category: 'pastry',
                    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400'
                },
                {
                    name: 'Club Sandwich',
                    description: 'Triple-layered sandwich with turkey, bacon, and veggies',
                    price: 8.50,
                    category: 'sandwich',
                    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400'
                },
                {
                    name: 'Grilled Cheese',
                    description: 'Classic grilled cheese sandwich',
                    price: 6.00,
                    category: 'sandwich',
                    image: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400'
                },
                {
                    name: 'Chocolate Cake',
                    description: 'Decadent chocolate layer cake',
                    price: 5.50,
                    category: 'dessert',
                    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
                },
                {
                    name: 'Cheesecake',
                    description: 'New York style cheesecake with berry sauce',
                    price: 6.00,
                    category: 'dessert',
                    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400'
                }
            ];

            await Product.deleteMany({}); // Clear existing products before seeding
            await Product.insertMany(products);// Insert new products into the database

            // Create an admin user if it doesn't exist
            const User = require('../models/User');
            const adminExists = await User.findOne({email: 'admin@cafecore.lk'});
            if (!adminExists) {
                const admin = new User({
                    name: 'Admin',
                    email: 'admin@cafecore.lk',
                    password: 'admin123', // In production, use a secure password
                    role: 'admin'
                });
                await admin.save();
                console.log('Admin user created: admin@cafecore.lk / admin123');
            }

            res.json({message: 'Products seeded successfully'});
        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
    }
};

module.exports = productController;