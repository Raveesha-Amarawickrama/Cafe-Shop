import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './components/products/ProductDetail';
import CartPage from './pages/CartPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/PrivateRoute';
import MenuManagement from './pages/admin/MenuManagement';
import UserManagement from "./pages/admin/UserManagement.jsx";

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