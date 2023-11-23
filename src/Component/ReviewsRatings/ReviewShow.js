import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FcRating } from "react-icons/fc";
import { fetchData } from "@/utils/FetchCode";

const ReviewShow = () => {
  const Id = useSelector((state) => state.Reviews.ProductOrderId);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetchData(
          `http://localhost:3000/api/reviews?id=652fc79d79526b18bd362583`
        );
        const data = response.data;
        console.log(data,"Reviews------- ---😂😂😂😂😂😂😂😂😂",   reviews);

        setReviews(data.reviews); // Assuming the reviews are in the 'reviews' property
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [Id]);

  if (!reviews) {
    return null; // or some loading state
  }
console.log("Reviews-------------------------------------------- 😂",   reviews);
   // Assuming reviews is an array of review objects
const renderedReviews = reviews.map((review) => {
  const { comment, rating, userId } = review;
  const profilePicture = userId ? userId.profilePicture : null;

  return (
    <div className="row" key={review._id}>
      <div className="col-2 my-auto mx-auto">
        {/* Display user image */}
        {profilePicture ? (
          <Image
            src={profilePicture}
            height={40}
            width={40}
            alt="User Image"
            className="rounded-circle"
          />
        ) : (
          <CgProfile size={30} />
        )}
      </div>
      <div className="col-10 d-flex justify-content-start align-items-center border border-4 border-black">
        <p className="fw-bold fs-4 my-auto">
          <FcRating className="mx-1 pb-1" size={25} />
          {rating}
        </p>
        <p className="ms-5 my-auto">{comment}</p>
      </div>
    </div>
  );
});

return <div>{renderedReviews}</div>;

};

export default ReviewShow;
