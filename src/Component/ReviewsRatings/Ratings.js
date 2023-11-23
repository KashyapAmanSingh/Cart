"use client";
import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { AiTwotoneStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";
import { addRatings } from "@/redux/ReviewSlice";


 

const StarRating = () => {
  // const [rating, setRating] = useState(0);
  const totalProductId = useSelector((state) => state.Reviews.ProductOrderId);

  console.log(totalProductId, "totalProductId from starRating");

  const dispatch = useDispatch();
  const handleRatingChange = (newRating) => {
    console.log("New Rating:", newRating);
    // setRating(newRating);
    dispatch(addRatings(newRating));
  };

  return (
    <div className="d-flex align-items-center justify-content-center mb-1">

      <ReactStars
        count={5}
        // value={rating}
        onChange={handleRatingChange}
        size={24}
        isHalf={true}
        emptyIcon={<AiTwotoneStar size={30} />}
        halfIcon={<BiSolidStarHalf size={30} />}
        fullIcon={<AiTwotoneStar size={30} />}
        activeColor="blue"
      />
    </div>
  );
};

export default React.memo(StarRating);

