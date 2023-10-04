"use client";
import React, {   useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "@/utils/FetchCode";

const SubmitReview = () => {
  const totalStar = useSelector((state) => state.Reviews.ratings);
  const ProductId = useSelector((state) => state.Reviews.ProductOrderId);
  const comment = useSelector((state) => state.Reviews.comment);

  const [userID, setUserID] = useState(null);
  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchData("/api/user");
        setUserID(response.data.user[0]._id);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    console.log("Fetching user data for the first time only for now");
    fetchUserData();
  }, []);

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
