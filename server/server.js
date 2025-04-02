const express = require("express");
const app = express();
const cors = require('cors');
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NHF7iIR6WFhZtkiVnEgaAqWgFBpxYLH4KndpJjyoomM3ivX0XFdXfXS1ij5oiXlGlnKsool6X9DxLcjwGOIy2Vu00MLdLOsJr');

app.use(express.static("public"));
app.use(express.json());

app.use(cors());

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
console.log(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


app.listen(4242, () => console.log("Node server listening on port 4242!"));