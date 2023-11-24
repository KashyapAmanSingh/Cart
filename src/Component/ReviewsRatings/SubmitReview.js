"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "@/utils/FetchCode";
import useSWR from "swr";
import SecurityAuth from "@/utils/SecurityAuth";
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const SubmitReview = () => {
  const totalStar = useSelector((state) => state.Reviews?.ratings);
  const ProductId = useSelector((state) => state.Reviews?.ProductOrderId);
  const comment = useSelector((state) => state.Reviews?.comment);
  const [userID, setUserID] = useState(null);
  const { isLoading, user } = SecurityAuth();
  const { data: userData, error: userError } = useSWR(
    `/api/user?id=${user?.id}`,
    fetcher
  );

  if (userError) {
    console.error("Error fetching user data:", userError);
  }
  useEffect(() => {
    if (user && user?.id) {
      setUserID(userData?.user[0]?._id);
    }
  }, [user, userData]);

  if (isLoading) return <div>Loading...</div>;

  const handleSubmit = async () => {
    const dataToSend = {
      rating: totalStar || 0,
      comment: comment || "",
      userId: userID || "",
      productId: ProductId || "",
    };

    try {
      const response = await fetchData("/api/reviews", "POST", dataToSend);
      console.log("Review submitted successfully", response);
      alert("Review submitted successfully");
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="text-center mb-5">
      <button
        onClick={handleSubmit}
        className="btn btn-danger"
        disabled={!comment.trim()}
      >
        Submit Review
      </button>
    </div>
  );
};

export default SubmitReview;
