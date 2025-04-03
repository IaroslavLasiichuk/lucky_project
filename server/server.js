const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51NHF7iIR6WFhZtkiVnEgaAqWgFBpxYLH4KndpJjyoomM3ivX0XFdXfXS1ij5oiXlGlnKsool6X9DxLcjwGOIy2Vu00MLdLOsJr");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-payment-link", async (req, res) => {
    try {
        const { amount, description } = req.body;

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
            success_url: "https://yourwebsite.com/success",
            cancel_url: "https://yourwebsite.com/cancel",
        });

        res.json({ paymentLink: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log("Server running on port 4242"));
