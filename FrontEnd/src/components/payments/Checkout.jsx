// src/components/payments/Checkout.jsx
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    // call backend API to create payment intent here
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
