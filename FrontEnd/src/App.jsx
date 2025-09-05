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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./components/payments/Checkout.jsx";
import CheckoutPage from './pages/CheckoutPage.jsx';
import Profile from './pages/Profile';

// ✅ Load Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51RxUgxKVQzHkUu7fpSCGvbOX5lhCd8Lb74ygHk5XJa5uBtLuIwZMNR9lWkiF9DYLpVnYr3KgMiGCMBzlfKFsSOSo00P3blUaeI"
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: { background: '#363636', color: '#fff' },
                success: {
                  duration: 3000,
                  theme: { primary: '#4aed88' },
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
                
                {/* Profile route - accessible to authenticated users */}
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
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
        </Elements>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;