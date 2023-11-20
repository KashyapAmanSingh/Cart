import React from "react";
// import { useState } from "react";
import axios from "axios";
import FilterSortQuery from "./FilterSortQuery";
import { fetchData } from "@/utils/FetchCode";

const Filter = () => {
  // const [response, setResponse] = useState(null);
  const apiUrl = FilterSortQuery();

  const handleButtonClick = async () => {
    try {
      console.log(apiUrl, "fROM fILTER sECTION ");
      const response = fetchData(apiUrl);
 console.log("setResponse(response.data);", response);
     } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return <button onClick={handleButtonClick}>Fetch Data</button>;
};

export default Filter;
