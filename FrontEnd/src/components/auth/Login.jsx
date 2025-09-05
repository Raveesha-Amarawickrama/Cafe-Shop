// src/components/auth/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast'; // Import toast for notifications

const Login = () => {
    const [formData, setFormData] = useState({ // Initialize form data state
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({}); // Initialize errors state
    const { login } = useAuth(); // Use the login function from AuthContext
    const navigate = useNavigate(); // Use navigate for redirection

    const handleChange = (e) => { // Handle input changes
        setFormData({ // Update form data state
            ...formData,
            [e.target.name]: e.target.value // Update the specific field based on input name
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => { // Validate form data
        const newErrors = {}; // Initialize an object to hold validation errors
        if (!formData.email) newErrors.email = 'Email is required'; // Check if email is provided
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => { // Handle form submission
        e.preventDefault(); // Prevent default form submission behavior
        const newErrors = validateForm(); // Validate the form data

        if (Object.keys(newErrors).length > 0) { // If there are validation errors
            setErrors(newErrors); // Set the errors state
            return;
        }

        const result = await login(formData.email, formData.password); // Call the login function from AuthContext
        if (result.success) { // If login is successful
            toast.success('Welcome back!'); // Show success notification
            navigate('/'); // Redirect to home page
        } else {
            toast.error(result.error || 'Login failed'); // Show error notification
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition duration-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-amber-600 hover:text-amber-700 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;