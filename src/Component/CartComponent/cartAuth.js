"use client";
import Cart from "@/Component/CartComponent/Cart";
import React, { useEffect, useState } from "react";
import Loader1 from "../Progress";
 
import SecureCartLogin from "./secureCartLogin";
import SecurityAuth from "@/utils/SecurityAuth";

const CartAuth = () => {
  const { isAuthenticated, isLoading } = SecurityAuth();

  return (
    <div>
      {isLoading ? (
        <Loader1 />
      ) : isAuthenticated ? (
        <Cart />
      ) : (
        <SecureCartLogin /> //<Link></Link>
      )}
    </div>
  );
};

export default CartAuth;
