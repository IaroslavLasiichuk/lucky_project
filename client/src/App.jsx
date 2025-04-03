import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import "./App.css";

const createPaymentLink = async () => {
  try {
    const response = await fetch("http://localhost:4242/create-payment-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50, // $50
        description: "Locksmith service payment",
      }),
    });

    const data = await response.json();
    if (data.paymentLink) {
      window.location.href = data.paymentLink; // Redirect customer to Stripe checkout
    } else {
      console.error("Error creating payment link:", data.error);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
};

export default function App() {
  return (
    <Router>
      <div className="App">
        <h1>Locksmith Payment</h1>
        <button onClick={createPaymentLink}>Pay Now</button>

        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </div>
    </Router>
  );
}
