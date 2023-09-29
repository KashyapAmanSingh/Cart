"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import ReactStars from 'react-rating-stars-component';
import { AiTwotoneStar } from 'react-icons/ai';
import { BiSolidStarHalf } from 'react-icons/bi';
import {  addRatings } from '@/redux/ReviewSlice';
  
const StarRating = ( ) => {
  const [rating, setRating] = useState(0);
  const totalProductId=  useSelector((state) => state.Reviews.ProductOrderId);

console.log(totalProductId,"totalProductId from starRating")

  const dispatch = useDispatch();
  const handleRatingChange = (newRating) => {
    console.log("New Rating:", newRating);
    setRating(newRating);
    dispatch(addRatings(rating));
  };

  const handleUpdateRatings = () => {
    dispatch(addRatings(rating));
    console.log("New Rating:", totalProductId);
  };

  return (
    <div>
      <ReactStars
        count={5}
        value={rating}
        onChange={handleRatingChange}
        size={24}
        isHalf={true}
        emptyIcon={<AiTwotoneStar size={30} />}
        halfIcon={<BiSolidStarHalf size={30} />}
        fullIcon={<AiTwotoneStar size={30} />}
        activeColor="blue"
      />
      <button onClick={handleUpdateRatings}>Update Ratings</button>
    </div>
  );
};

export default StarRating;
