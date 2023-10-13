import React from "react";
 import { initializeStripe } from "@/utils/stripe";
import { useDispatch, useSelector } from "react-redux";
import { setSession } from "@/redux/Slice";
import { fetchData } from "@/utils/FetchCode";

const CheckoutButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const userDbsId = useSelector((state) => state.user.user);
  console.log(
    userDbsId._id,
    "I AM A USER DATA FETCH FROM USERINFO SLICE AND I AM FROM CHECKOUT FORM IN THE DOCS CODES "
  );
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || cartItems.length > 5) {
      alert("Invalid cart items. The number of items in the cart should be between 1 and 5.");
      return; 
    }
    try {
      setLoading(true);

      const dataToSend = {
        cart: cartItems.map((item) => ({
          _id: item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.title,
          image: item.image,
        })),
        userDbsId: userDbsId._id,
      };
 
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
    <button
      className="btn btn-dark"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default CheckoutButton;
 