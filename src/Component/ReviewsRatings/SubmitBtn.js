"use client";


import React from 'react'
 

const SubmitBtn = ({ handleSubmit, disabled }) => {
  return (
    <div>
      <button
        onClick={handleSubmit}
        className="btn btn-danger"
        disabled={disabled}
      >
        Submit Review
      </button>
    </div>
  );
};

export default SubmitBtn;
