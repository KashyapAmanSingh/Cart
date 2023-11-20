"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sortedItem } from "@/redux/ProductSlice";
import { sortedQuery } from "@/redux/FilterSortSlice";

const Sorting = () => {
  const dispatch = useDispatch();
  const [sortingOption, setSortingOption] = useState();
  // const [sortedData, setSortedData] = useState([]);

  //console.log("Response data from sorted component file js :", sortedData);
  useEffect(() => {
    // dispatch(filteredItem(filterData));
    dispatch(sortedQuery(sortingOption));
  }, [sortingOption,dispatch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (sortingOption) {
  //       try {
  //         // console.log("Fetching data with sortingOption:", sortingOption);
  //         const response = await axios.get(
  //           `/api/fetchProduct?sortBy=${sortingOption}`
  //         );
  //         dispatch(sortedItem(response.data.products));

  //         setSortedData(response.data.products);
  //       } catch (error) {
  //         console.error(
  //           "Error fetching data: /api/fetchProduct?sortBy ",
  //           error
  //         );
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [sortingOption, dispatch]);

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
