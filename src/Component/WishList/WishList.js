import { addWishList } from "@/redux/Slice";
import React, { useEffect, useState } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useDispatch } from "react-redux";

const WishList = ({ wishProductDetail }) => {
  const [wish, setWish] = useState(() => {
    const storedWishListString = localStorage.getItem("WishList");
    const wishList = storedWishListString
      ? JSON.parse(storedWishListString)
      : [];
    const existingItem = wishList.find(
      (item) => item._id === wishProductDetail._id
    );
    return Boolean(existingItem);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const storedWishListString = localStorage.getItem("WishList");
    if (storedWishListString) {
      const parsedCartItems = JSON.parse(storedWishListString);
      const existingItem = parsedCartItems.find(
        (item) => item._id === wishProductDetail._id
      );
      setWish(Boolean(existingItem));
    }
  }, [wishProductDetail]);

  const addWishClick = () => {
    if (!wish) {
      setWish(true);
      dispatch(addWishList(wishProductDetail));
    }

    console.log("Added to wishlist:", wishProductDetail);
  };

  return (
    <div className=" m-0 p-0 float-end">
      <div onClick={addWishClick}  >
        {wish ? <FcLike /> : <FcLikePlaceholder />}
      </div>
    </div>
  );
};

export default WishList;
