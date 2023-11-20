"use client";
import { filteredSearchedQuery } from "@/redux/FilterSortSlice";
 import React, {  useState } from "react";
import { useDispatch } from "react-redux";

const Searching = () => {
  const [searchTerm, setSearchTerm] = useState("");
   const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(filteredSearchedQuery(searchTerm));
      
  };

  return (
    <div className="m-0 w-50 my-1  mx-auto  ">
      <form onSubmit={handleSubmit} className="d-flex justify-content-center px-0  " role="search">
        <input
          className="form-control  w-75  me-1"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-success me-2" type="submit" disabled={!searchTerm.trim()}>
          Search
        </button>
      </form>
    </div>
  );
  
};

export default Searching;
