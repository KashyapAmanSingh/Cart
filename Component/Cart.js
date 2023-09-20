/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import CheckoutButton from "@/Compo/checkoutform";
import { removeItem, setQuantity } from "@/redux/Slice";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const handleremove = (id) => {
    dispatch(removeItem(id));
  };

  const handleUnitChange = (quantity, i) => {
    const parsedQuantity = parseInt(quantity, 10);
    dispatch(setQuantity({ quantity: parsedQuantity, i }));
  };

  return (
    <>
      <h1> cartItems ------------cartItems </h1>
      <div className="mt-5">
        <div className="container">
          <div className="row">
            {cartItems &&
              cartItems.map((product, i) => (
                <div className="col-md-3 mt-5" key={i}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={product.image} alt={product.title} />
                    <div className="card-body">
                      <h5>{product.title.slice(0, 30)}</h5>
                      <h5>{product.price}</h5>

                      <button
                        className="btn btn-primary"
                        onClick={() => handleremove(i)} // Pass the index
                      >
                        Remove
                      </button>

                      <label htmlFor="quantityInput">Quantity:</label>

                      <select
                        className="form-control"
                        id="quantityInput"
                        onChange={(e) => handleUnitChange(e.target.value, i)}
                      >
                        <option value="1"> 1</option>
                        <option value="2"> 2</option>
                        <option value="3"> 3</option>
                        <option value="4"> 4</option>
                        <option value="5"> 5</option>
                      </select>
                    </div>
                  </div>

                  <CheckoutButton />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
