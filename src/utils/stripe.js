 

import { loadStripe } from '@stripe/stripe-js';

let stripePromise; 

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51Nr0qpSGcFt4Msz1CIwihJkf7UxpFrMAQKf4Pqz2r02lAT3l5XwrdYCuCsH1RuW1HH75kVRsXQbiA69kUceozF0A00m6rRlaJB");
  }
  return stripePromise;
};

export const initializeStripe = async () => {
  const stripe = await getStripe();
  return stripe;
};
