import React from 'react';
import axios from 'axios';
import { initializeStripe } from '@/utils/stripe';
import  {  useDispatch,useSelector }  from 'react-redux';
import { setSession } from '@/redux/Slice';

const CheckoutButton = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems, "CheckoutButton cart Items");
  const dispatch = useDispatch();


  const session = useSelector((state) => state.cart.session);
  console.log(session, "Payment session  id of stripe bro ");




  const handleCheckout = async (e) => {
    
    e.preventDefault();
    try {
      const dataToSend = {
        cart: cartItems.map((item) => ({
          id:item.id,
          quantity: item.quantity,
          price: item.price,
          title: item.title,
          image: item.image
        })),
      };
      console.log(dataToSend, "CheckoutButton dataToSend");
      console.log('Before Axios request');
      const response = await axios.post('/api/checkout', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      console.log('After Axios request');





      if (response.status === 200) {
        const sessionId = response.data;
        console.log('Session ID:', sessionId);


        
       dispatch( setSession(sessionId));
        const stripe = await initializeStripe();
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });
 

   
        if (error) {
          console.error('Stripe error:', error.message);
        }
      } else {
        console.error('Server responded with an error:', response.status, response.statusText);
      }
        
    } catch (error) {
      console.error('Checkout error:', error.message);
    }
  };
  

  return <button onClick={handleCheckout}>Buy Now</button>;
};

export default CheckoutButton;

