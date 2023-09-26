"use client";
import React, { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";

const CartCount = () => {
  const [count, setCount] = useState(0);
  const cartItems = useSelector((state) => state.cart.count);

  useEffect(() => {
    const cartCountLocalStorage = localStorage.getItem("cartItems");
    const cartItemsArray = JSON.parse(cartCountLocalStorage);
    let cartItemsLength;
    if (Array.isArray(cartItemsArray)) {
      cartItemsLength = cartItemsArray.length;
     } else {
      console.log("cartItemsArray is not an array or is empty.");
    }
    setCount(cartItemsLength);
  }, [cartItems]);

  return (
    <div>
      <BsCart4 size={30} />
      {count}
    </div>
  );
};

export default CartCount;

 