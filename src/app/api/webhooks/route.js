 // Note put webhooks.js into the api/webhooks/Router.js  

import { buffer } from 'micro';
import Stripe from 'stripe';

// const stripe = new Stripe("sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic");  

const stripe = new Stripe("sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic", {
  apiVersion: '2020-08-27' // Replace with the desired API version
});

console.error(`Webhook checking bro just`);

 const endpointSecret = "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9";

// Export named function for getServerSideProps
export async function getServerSideProps() {
  return {
    props: {
      api: {
        bodyParser: false,
      },
    },
  };
}

 export async function handleWebhookEvent(req, res) {
  console.log(req ,"req req '")
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];
    const buf = await buffer(req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook signature verification failed: ${err.message}`);
    }
    switch (event.type) {
      case 'checkout.session.async_payment_failed':
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        console.log('checkoutSessionAsyncPaymentFailed', checkoutSessionAsyncPaymentFailed);
        break;
      case 'checkout.session.async_payment_succeeded':
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        console.log('checkoutSessionAsyncPaymentSucceeded', checkoutSessionAsyncPaymentSucceeded);
        break;
      case 'checkout.session.completed':
        const checkoutSessionCompleted = event.data.object;
        console.log('checkoutSessionCompleted', checkoutSessionCompleted);
        break;
      case 'checkout.session.expired':
        const checkoutSessionExpired = event.data.object;
        console.log('checkoutSessionExpired', checkoutSessionExpired);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).end();
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

console.error(`Webhook  second time checking bro just`);

export default handleWebhookEvent;





// Note put webhooks.js into the api/webhooks/Router.js  


 