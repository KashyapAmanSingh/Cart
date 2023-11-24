import React from "react";
 import axios from "axios";
import FilterSortQuery from "./FilterSortQuery";
import { fetchData } from "@/utils/FetchCode";

const Filter = () => {
   const apiUrl = FilterSortQuery();

  const handleButtonClick = async () => {
    try {
       const response = fetchData(apiUrl);
     } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return <button onClick={handleButtonClick}>Fetch Data</button>;
};

export default Filter;
