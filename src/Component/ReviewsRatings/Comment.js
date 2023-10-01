// "use client";
// "use client";
import { useDispatch } from "react-redux";
import { addComment } from "@/redux/ReviewSlice";
import SubmitReview from "./SubmitReview";

const Comment = () => {
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    dispatch(addComment(e.target.value));
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mb-3">
        <h2>Leave a Review</h2>
        <textarea
          rows="4"
          cols="50"
          placeholder="Write your comment here..."
          onChange={handleCommentChange}
        />
      </div>
      <SubmitReview />
    </>
  );
};

export default Comment;
