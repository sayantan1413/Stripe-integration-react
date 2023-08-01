import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NXjGWAXpNR1ByaQSbzm4sYzTDuHMFfUFvVgYAcuvcR0uPKFSnxZWnZlKZfuVbZKbhj3sU2QzrVFsQMQNO84xs1p007NnY8t1X');

function App() {
  const handleCheckout = async () => {
    const response = await fetch('http://localhost:8000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId: 'price_1NZqTmAXpNR1ByaQqyjnmrK9' }),
    });
    const data = await response.json();

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    console.log(result)
    if (result.error) {
      // Handle any errors that occur during the redirect to Checkout
      console.error(result.error);
    }
  };

  const handlePaidCheckout = async () => {
    const response = await fetch('http://localhost:8000/create-checkout-session-paid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId: 'price_1NZtsgAXpNR1ByaQtFCGh2t0' }),
    });
    const data = await response.json();

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    });

    console.log(result)
    if (result.error) {
      // Handle any errors that occur during the redirect to Checkout
      console.error(result.error);
    }
  };

  return (
    <div>
      <h1>Stripe Integration Example</h1>
      <button onClick={handleCheckout}>Free Checkout</button>
      <button onClick={handlePaidCheckout}>Paid Checkout</button>
    </div>
  );
}

export default App;
