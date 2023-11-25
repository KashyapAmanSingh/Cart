 

import { loadStripe } from '@stripe/stripe-js';

let stripePromise; 

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const initializeStripe = async () => {
  const stripe = await getStripe();
  return stripe;
};
