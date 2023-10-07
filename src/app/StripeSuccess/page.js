// http://localhost:3000/StripeSuccess?session_id=cs_test_b1qSsxX34jhdYKblUp2UHpveepfMJ4KEekvPVAy10DHztrmQurJq0FBVoX

 "use client"
import axios from "axios";
 import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/retrieveSession`, {
          id: session_id,
        });
        console.log("Retrieved Data:", response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to redirect to the home page
  const redirectToHome = () => {
    console.log("Redirecting to Home Page");
    router.push("/");
  };

  // JSX structure for the success page
  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session_id}</p>
       <button
        className="btn btn-danger"
        id="continueShoppingButton"
        onClick={redirectToHome}
      >
        Continue Shopping
      </button>
    </div>
  );
};

 export default SuccessPage;

























// "use client";

// import Stripe from "stripe";
// import { useRouter, useSearchParams } from "next/navigation";
// const stripe = new Stripe(
//   "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
// );
// const SuccessPage = () => {
//   const router = useRouter();

//   const params = useSearchParams();

//   const session_id = params.get("session_id");

//   if (typeof window !== "undefined" && session_id) {
//     stripe.checkout.sessions.retrieve(
//       session_id,
//       { include: ["line_items"] },
//       (err, retrievedSession) => {
//         if (err) {
//           console.error("Error retrieving session:", err);
//         } else {
//           console.log("Retrieved ", retrievedSession);

//           // Check if metadata exists and has order_id
//           const orderId = retrievedSession.metadata?.order_id;

//           if (orderId) {
//             console.log(orderId, "Order ID");
//           } else {
//             console.log("Order ID not found in session metadata.");
//           }
//         }
//       }
//     );
//     console.log(
//       session_id,
//       typeof session_id,
//       "<<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SuccessPage Payment SuccessPage~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>"
//     );
//   }

//   if (!session_id) {
//     console.error("Session ID not found in query parameters");
//     return;
//   }

//   const redirectToHome = () => {
//     console.log("Redirecting to Home Page");
//     // window.location.href = "/";
//     router.push("/");
//   };

//   return (
//     <div>
//       <h1>Thank you for your payment!</h1>
//       <p>Your SuccessPageID: {session_id}</p>
//       {/* <pre>{JSON.stringify(session_id, null, 2)}</pre> */}
//       <button
//         className="btn btn-danger"
//         id="continueShoppingButton"
//         onClick={redirectToHome}
//       >
//         Continue Shopping
//       </button>
//     </div>
//   );
// };

// export default SuccessPage;
