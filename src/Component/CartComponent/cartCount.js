"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsCart4 } from 'react-icons/bs';

const CartCount = () => {
  const [count, setCount] = useState(0);
  const cartItems = useSelector((state) => state.cart.count);

  useEffect(() => {
    const cartCountLocalStorage = localStorage.getItem('cartItems');
    const cartItemsArray = JSON.parse(cartCountLocalStorage);

    if (Array.isArray(cartItemsArray)) {
      setCount(cartItemsArray.length);
    } else {
      console.log('cartItemsArray is not an array or is empty.');
    }
  }, [cartItems]);

  return (
    <div>
      <BsCart4 size={30} />
      {count}
    </div>
  );
};

export default CartCount;

 

 