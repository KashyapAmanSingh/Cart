/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

import Detail1 from "@/Component/Detail/Detail1";
import DynamicTabs from "@/Component/Detail/Detail2";
import StarRating from "@/Component/ReviewsRatings/Ratings";
import Comment from "@/Component/ReviewsRatings/Comment";
import { addProductOrderId } from "@/redux/ReviewSlice";
import { useDispatch } from "react-redux";
import { DetailedProduct } from "@/redux/ProductSlice";
import Loader from "@/Component/Progress";
import useSWR from "swr";

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

  if (error) {
    console.error("Error:", error);
  }

  if (!data) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader />;
      </div>
    );
  }

  dispatch(DetailedProduct(data.product));

  dispatch(addProductOrderId(params.slug));

  return (
    <>
      <Detail1 />
      <DynamicTabs />
      <StarRating />
      <Comment />
    </>
  );
};

export default Page;
