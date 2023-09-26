import React from "react";
// import { useState } from "react";
import axios from "axios";
import FilterSortQuery from "./FilterSortQuery";
 
const Filter = () => {
  // const [response, setResponse] = useState(null);
  const apiUrl = FilterSortQuery();

  const handleButtonClick = async () => {
    try {
      console.log(apiUrl,"fROM fILTER sECTION ");
       const response = await axios.get(apiUrl);
       console.log('setResponse(response.data);',response);
      // setResponse(response.data);  
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return <button onClick={handleButtonClick}>Fetch Data</button>
     
};

export default Filter;
