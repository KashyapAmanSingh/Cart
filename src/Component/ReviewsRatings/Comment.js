"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [fetchedUserId, setFetchedUserId] = useState("");

  const totalStar = useSelector((state) => state.Reviews.ratings);
  const ProductId = useSelector((state) => state.Reviews.ProductOrderId);
  const userIdFromSlice = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!userIdFromSlice) {
      const fetchUserId = async () => {
        try {
          const response = await axios.get("/api/user");
          setFetchedUserId(response.data);
          console.log("Fetched user ", response);
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      };

      fetchUserId();
    }
  }, []); // userIdFromSlice  

  console.log("Comment component TotalStar:-> ", totalStar);
  console.log("Comment component ProductId -> ", ProductId);

  const userId = fetchedUserId || userIdFromSlice;

  console.log(userId ? "User ID::-> " + userId : "User ID is null");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const dataToSend = {
      rating: totalStar || 0,
      comment: comment || "",
      userId: userId || "", // Use userId here
      productId: ProductId || "",
    };

    axios
      .post("/api/reviews", dataToSend)
      .then((response) => {
        console.log("Response from backend:", response.data);
      })
      .catch((error) => {
        console.error("Error during request:", error);
      });
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Write your comment here..."
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
};

export default Comment;
