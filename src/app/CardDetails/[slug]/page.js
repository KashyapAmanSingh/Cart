/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Detail1 from "@/Component/Detail/Detail1";
import DynamicTabs from "@/Component/Detail/Detail2";
import StarRating from "@/Component/ReviewsRatings/Ratings";
import Comment from "@/Component/ReviewsRatings/Comment";
import { addProductOrderId } from "@/redux/ReviewSlice";
import { useDispatch  } from "react-redux";
import { DetailedProduct } from "@/redux/ProductSlice";
import Loader from "@/Component/Progress";

const Page = ({ params }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  dispatch(addProductOrderId(params.slug));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/fetchDetailProduct", {
          params: {
            id: params.slug,
          },
        });
        dispatch(DetailedProduct(response.data.product));
        console.log("Server Response:", response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch,params.slug]);

  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader />;
      </div>
    );
  }

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
