import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import { CartProvider } from './contexts/CartContext.js';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import Products from './pages/Products.js';
import ProductDetail from './components/products/ProductDetail.js';
import CartPage from './pages/CartPage.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import PrivateRoute from './components/PrivateRoute.js';
import MenuManagement from './pages/admin/MenuManagement.js';
import UserManagement from "./pages/admin/UserManagement.js";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                theme: {
                                    primary: '#4aed88',
                                },
                            },
                        }}
                    />
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/cart"
                                element={
                                    <PrivateRoute>
                                        <CartPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/menu"
                                element={
                                    <PrivateRoute>
                                        <MenuManagement />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/admin/users"
                                element={
                                    <PrivateRoute>
                                        <UserManagement />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Layout>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;