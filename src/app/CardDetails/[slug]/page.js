/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

import Detail1 from "@/Component/Detail/Detail1";
import DynamicTabs from "@/Component/Detail/Detail2";
import StarRating from "@/Component/ReviewsRatings/Ratings";
import Comment from "@/Component/ReviewsRatings/Comment";
import { addProductOrderId } from "@/redux/ReviewSlice";
import { useDispatch } from "react-redux";
import { DetailedProduct } from "@/redux/ProductSlice";
import Loader from "@/Component/Progress";
import useSWR from "swr";
import ReviewShow from "@/Component/ReviewsRatings/ReviewShow";
 
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Page = ({ params }) => {
  
  const dispatch = useDispatch();
  const { data, error } = useSWR(
    `/api/fetchDetailProduct?id=${params.slug}`,
    fetcher
  );

   const { data: authData, error: authError } = useSWR("/api/kindeSession", fetcher);

  if (error || authError) {
    console.error("Error:", error || authError);
  }

  if (!data || !authData) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader />;
      </div>
    );
  }

  const { authenticated } = authData ;

  dispatch(DetailedProduct(data.product));
  dispatch(addProductOrderId(params.slug));

 
  return (
    <>
      <Detail1 />
      <DynamicTabs />

      {authenticated && (
        <>
          <StarRating />
          <Comment />
        </>
      )}
        <div className="Review_Container mb-5">
          <h6 className=" text-center fs-3 fw-medium my-2">Ratings & Reviews</h6>
          <ReviewShow />
        </div>
    </>
  );
};

export default Page;
