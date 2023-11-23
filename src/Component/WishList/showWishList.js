"use client";

import { removeWishListItem } from "@/redux/Slice";
import { HandleAddToCartBtn, HandleCartImage } from "@/utils/Functions";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import WishList from './WishList'; // Assuming you have a WishList component

const ShowWishList = () => {
  const [wishListItems, setWishListItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedWishListString = localStorage.getItem("WishList");
    const wishList = storedWishListString
      ? JSON.parse(storedWishListString)
      : [];
    setWishListItems(wishList);
  }, []);

  const removeWishList = (id) => {
    dispatch(removeWishListItem(id));
    removeItems();
  };

  const removeItems = () => {
    const storedWishListString = localStorage.getItem("WishList");

    if (storedWishListString) {
      const wishList = storedWishListString
        ? JSON.parse(storedWishListString)
        : [];
      setWishListItems(wishList);
    }
  };

  return (
    <div>
      <h2>Wish List</h2>
      <div className="container">
        <div className="row  mt-5">
          {wishListItems.map((product) => (
            <div className="col-md-3 mt-5" key={product._id}>
              <div className="card" style={{ width: "18rem" }}>
                {/* <WishList wishProductDetail={product} /> */}
                <HandleCartImage
                  src={product.firstImage}
                  alt={product.title}
                  id={product._id}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title.slice(0, 70)}</h5>
                  <br />
                  <h5 className="card-title">Price: {product.price}</h5>
                  <h5 className="card-title">Rankings: {product.ratings}</h5>
                  <h5 className="card-title">Discount: {product.discount}</h5>
                  <div className="d-flex">
                    <HandleAddToCartBtn product={product} />
                    <button
                      className="btn btn-danger mx-auto"
                      onClick={() => removeWishList(product._id)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowWishList;
