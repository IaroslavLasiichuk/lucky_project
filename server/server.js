// This example sets up an endpoint using the Express framework.
// To learn more about Express, watch this video: https://youtu.be/rPR2aJ6XnAc.
const express = require('express');
const app = express();

const stripe = require('stripe')('sk_test_51NHF7iIR6WFhZtkiVnEgaAqWgFBpxYLH4KndpJjyoomM3ivX0XFdXfXS1ij5oiXlGlnKsool6X9DxLcjwGOIy2Vu00MLdLOsJr');

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    ui_mode: 'embedded',
    return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
  });

  res.send({clientSecret: session.client_secret});
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));