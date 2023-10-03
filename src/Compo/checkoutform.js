
import React from "react";
import axios from "axios";
import { initializeStripe } from "@/utils/stripe";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "@/redux/Slice";
import { fetchData } from "@/utils/FetchCode";

const CheckoutButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const session = useSelector((state) => state.cart.session);
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const dataToSend = {
        cart: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.title,
          image: item.image,
        })),
      };

      console.log("Before Axios request");
      const response = await fetchData("/api/checkout", "POST", dataToSend);

 

      console.log("After Axios request");
      if (response.status === 200) {
        const sessionId = response.data;
        console.log("Session ID:", sessionId);

        dispatch(setSession(sessionId));
        const stripe = await initializeStripe();

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.error("Stripe error:", error.message);
        }
      } else {
        console.error(
          "Server responded with an error:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Checkout error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-dark" onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default CheckoutButton;




























// import React from "react";
// import axios from "axios";
// import { initializeStripe } from "@/utils/stripe";
// import { useDispatch, useSelector } from "react-redux";
// import { setSession } from "@/redux/Slice";

// const CheckoutButton = () => {
//   // *Fetch Data by local storage then comapre

//   const cartItems = useSelector((state) => state.cart.items);
//    const dispatch = useDispatch();

//   const session = useSelector((state) => state.cart.session);
 
//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     try {
//       const dataToSend = {
//         cart: cartItems.map((item) => ({
//           id: item.id,
//           quantity: item.quantity,
//           price: item.price,
//           title: item.title,
//           image: item.image,
//         })),
//       };
//        console.log("Before Axios request");
//       const response = await axios.post("/api/checkout", dataToSend, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("After Axios request");

//       if (response.status === 200) {
//         const sessionId = response.data;
//         console.log("Session ID:", sessionId);

//         dispatch(setSession(sessionId));
//         const stripe = await initializeStripe();

//         const { error } = await stripe.redirectToCheckout({
//           sessionId: sessionId,
//         });

//         if (error) {
//           console.error("Stripe error:", error.message);
//         }
//       } else {
//         console.error(
//           "Server responded with an error:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Checkout error:", error.message);
//     }
//   };

//   return (
//        <button className="btn btn-dark" onClick={handleCheckout}>
//         Buy Now
//       </button>
//    );
// };

// export default CheckoutButton;
