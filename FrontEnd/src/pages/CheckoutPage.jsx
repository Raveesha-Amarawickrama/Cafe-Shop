import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import serverURL from '../serverURL.js';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + (item.product?.price ?? 0) * (item.quantity ?? 0),
        0
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const { data } = await axios.post(`${serverURL}/api/payment-intent`, {
                amount: Math.round(totalAmount * 100), // cents
            });

            const clientSecret = data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: { name: 'Test User' },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
            } else if (result.paymentIntent?.status === 'succeeded') {
                toast.success('Payment successful!');
                await clearCart();
                navigate('/');
            }
        } catch (err) {
            console.error(err);
            toast.error('Payment failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-6">Checkout</h1>
                <p className="mb-4 text-lg font-medium">Total to pay: ${totalAmount.toFixed(2)}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardElement className="p-2 border rounded" />
                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        {loading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
