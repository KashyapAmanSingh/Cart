/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from "react";
import CheckoutButton from "@/Compo/checkoutform";
import { removeItem, setQuantity } from "@/redux/Slice";

import { useDispatch  } from "react-redux";
import Loader from "../Progress";
import { addUser } from "@/redux/UserInfoSlice";

const Cart = () => {
 
  const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);

  //  const [user, setUser] = useState();
  // const [authStatus, setAuthStatus] = useState(null);
  const dispatch = useDispatch()


  // useEffect(() => {
  //   const getKindeSession = async () => {
  //     try {
  //       const res = await fetch("/api/kindeSession");
  //       const data = await res.json();
  //       setUser(data.user);
  //       console.log(data.user.id,"this is best place here to use as we have all users info so it it and use them bro ");
  //       dispatch(addUser(data.user.id))
  //       setAuthStatus(data.authenticated);
  //     } catch (error) {
  //       console.error('Error fetching user information:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getKindeSession();
  // }, []);





  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
    }
  }, []);

  const handleremove = (id) => {
    dispatch(removeItem(id));
    removeItems();
  };

  const removeItems = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
    }
  };

  const handleUnitChange = (quantity, i) => {
    const parsedQuantity = parseInt(quantity, 10);
    dispatch(setQuantity({ quantity: parsedQuantity, i }));
  };

  return (
    <>
      <div className="mt-0">
        <div className="container">
          <div className="row">
            {cartItems &&
              cartItems.map((product, i) => (
                <div className="col-md-3 mt-3" key={i}>
                  <div className="card" style={{ width: "18rem" }}>
                    <img src={product.image} alt={product.title} />
                    <div className="card-body">
                      <h5>{product.title.slice(0, 30)}</h5>
                      <h5>{product.price}</h5>

                      <button
                        className="btn btn-primary"
                        onClick={() => handleremove(product.id)} // Pass the index
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
                </div>
              ))}
          </div>
        </div>

{/* 
        {loading ? (
  <Loader/> 
) : authStatus ? ( */}
  <CheckoutButton />
{/* ) : ( 
  <p>Please log in to view your cart. </p>
)} */}

 


    
      </div>
    </>
  );
};

export default Cart;
