"use client";
import React, { useState, useEffect } from "react";
 import { useDispatch } from "react-redux";
 import { sortedQuery } from "@/redux/FilterSortSlice";

const Sorting = () => {
  const dispatch = useDispatch();
  const [sortingOption, setSortingOption] = useState();
 
   useEffect(() => {
     dispatch(sortedQuery(sortingOption));
  }, [sortingOption,dispatch]);

 
  return (
    <div>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => setSortingOption(e.target.value)}
      >
        <option defaultValue>Sort Product </option>
        <option value="des_price">  By Price high to low</option>
        <option value="asc_price">  By Price low to high</option>
        <option value="ratings">  By ratings</option>
        <option value="timestamp">  By newest to oldest</option>
        <option value="discount">  By Product discount %</option>
      </select>
    </div>
  );
};

export default Sorting;
