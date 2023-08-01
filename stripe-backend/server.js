const express = require('express');
const stripe = require('stripe')('sk_test_51NXjGWAXpNR1ByaQT96ZI76jLLpMBqst1urjZwVNWQU1y4s7w5fkW5jscZY4giXoi4hOum6YU5yQJh7VxqPyb3u300j3OhpNAE');

const app = express();
app.use(express.json());

// Enable CORS for requests from the frontend (adjust the origin as needed)
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

// Endpoint to create a Stripe checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
  success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: 'http://localhost:3000/cancel',
  customer_email: 'test2006@gmail.com',
  line_items: [
    {
      price: priceId
    },
  ],
  subscription_data: {
    trial_settings: {
      end_behavior: {
        missing_payment_method: 'cancel',
      },
    },
    trial_period_days: 720,
  },
  payment_method_collection: 'if_required',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong 2' });
  }
});

app.post('/create-checkout-session-paid', async (req, res) => {
    const { priceId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/cancel',
        customer_email: 'test2001@gmail.com',
        line_items: [
        {
            price: priceId
        },
        ],
      });
  
      res.json({ sessionId: session.id });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Something went wrong 2' });
    }
  });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
