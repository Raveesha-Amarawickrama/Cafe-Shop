// src/components/common/Footer.jsx

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Cafe Core</h3>
                        <p className="text-gray-400">
                            Your favorite coffee destination. Serving premium coffee and delicious treats since 2024.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/products" className="hover:text-white transition">Menu</a></li>
                            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>123 Coffee Street</li>
                            <li>Moratuwa, Sri Lanka</li>
                            <li>Phone: +94 11 234 5678</li>
                            <li>Email: hello@cafecore.lk</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2024 Café Core. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;