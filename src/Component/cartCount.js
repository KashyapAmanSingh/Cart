import React from 'react';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const CartCount = () => {
  const cartItems = useSelector((state) => state.cart.count);

  return (
    <div>
 
        <BsCart4 size={30} />  
           {cartItems }
         
     </div>

  );
}

export default CartCount;


















