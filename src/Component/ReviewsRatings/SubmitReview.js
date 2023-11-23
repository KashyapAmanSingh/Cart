"use client";
import React, { useEffect,  useState } from "react";
import { useSelector } from "react-redux";
import { fetchData } from "@/utils/FetchCode";
import useSWR from "swr";
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

  const { data: authData, error: authError } = useSWR("/api/kindeSession", fetcher);
   const { data: userData, error: userError } = useSWR(`/api/user?id=${authData.user.id}`, fetcher);
   
if (userError) {
  console.error("Error fetching user data:", userError);
}
useEffect(() => {
  if (authData && userData) {
   
      setUserID(userData.user[0]._id);

  }

}, [authData, userData]);
 
 
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
