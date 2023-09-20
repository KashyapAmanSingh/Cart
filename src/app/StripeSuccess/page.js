
"use client"
import { useSelector } from "react-redux";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic");

const SuccessPage = () => {
  const session = useSelector((state) => state.cart.session);
  
  if (typeof window !== 'undefined') {
    console.log(session, "SuccessPage Payment SuccessPage");

    const storedSessionData = JSON.parse(localStorage.getItem('sessionData'));
     if (storedSessionData) {
      stripe.checkout.sessions.retrieve("cs_test_a1gvzyGuaIngFX8DTOf1lsRBVxDKRJu1GOLnMRISvnMqI9SJWlkN6rneeD", (err, retrievedSession) => {
        if (err) {
          console.error('Error retrieving session:', err);
        } else {
          console.log('Retrieved Session Details:', retrievedSession);

          // Check if metadata exists and has order_id
          const orderId = retrievedSession.metadata?.order_id;

          if (orderId) {
            console.log(orderId, "Order ID");
          } else {
            console.log("Order ID not found in session metadata.");
          }
        }
      });
    }
  }

  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default SuccessPage;









// source: "/api/.*",
