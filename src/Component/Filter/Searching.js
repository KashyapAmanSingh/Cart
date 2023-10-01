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
    <div>
      <form onSubmit={handleSubmit} className="d-flex px-4" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit"  disabled={!searchTerm.trim()} >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searching;
