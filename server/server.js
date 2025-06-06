const express = require("express");
const cors = require("cors");
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require('./config/connection');
const app = express();
app.use(express.json());
app.use(cors());


app.post("/add", async(req, res)=>{
    try {
        const { amount, description, name} = req.body;
        console.log(name);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
   
})
app.post("/create-payment-link", async (req, res) => {
    try {
        const { amount, description, name } = req.body;
        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Payment",
                            description: description,
                        },
                        unit_amount: amount * 100, // Stripe uses cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ paymentLink: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log(`Server running on port 4242 http://localhost:4242`));
