
"use client"
 import { useSelector } from "react-redux";
 
import Stripe from "stripe";
import { useRouter } from 'next/navigation';
const stripe = new Stripe("sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic");

const SuccessPage = () => {
  const router = useRouter();
   
  const session = useSelector((state) => state.cart.session);
  
  if (typeof window !== 'undefined') {
    console.log(session, "SuccessPage Payment SuccessPage");

    const storedSessionData = JSON.parse(localStorage.getItem('sessionData'));
     if (storedSessionData) {
      stripe.checkout.sessions.retrieve(storedSessionData , (err, retrievedSession) => {
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
       
  
  const redirectToHome =() => {
console.log("Redirecting to Home Page");
    // window.location.href = "/";
    router.push('/');
 

       }



  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button className='btn btn-danger' id="continueShoppingButton" onClick={redirectToHome}>Continue Shopping</button>
    </div>
  );
};

export default SuccessPage;









// source: "/api/.*",
