"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Sorting = () => {
  const [sortingOption, setSortingOption] = useState();
  const [sortedData, setSortedData] = useState([]);
  console.log(sortedData,"*******************==============*******************=sortedData=*******************==============*******************=")
  useEffect(() => {
    const fetchData = async () => {
      if (sortingOption) {
        try {
          console.log("Fetching data with sortingOption:", sortingOption); // Add this line
          const response = await axios.get(`/api/fetchProduct?sortBy=${sortingOption}`);
 
          setSortedData(response.data.products);
        } catch (error) {
          console.error("Error fetching data: /api/fetchProduct?sortBy ", error);
        }
      }
    };

    fetchData();
  }, [sortingOption]);
 
  return (
    <div>
     <select
  className="form-select"
  aria-label="Default select example"
  onChange={(e) => setSortingOption(e.target.value)}
>

        <option defaultValue>Open this select menu</option>
        <option value="des_price">Sort price high to low</option>
        <option value="asc_price">Sort price low to high</option>
        <option value="ratings">Sort By ratings</option>
        <option value="timestamp">Sort By newest to oldest</option>
        <option value="discount">Sort by discount</option>
      </select>
      {/* <ul>
        {sortedData.map((item, i) => (
          <ul key={i}>
            <li>
              <div className="cartCard">
                <h5>{item.title}</h5>

                <h5>{item.price}</h5>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}  
                  height={200}  
                />
              </div>
            </li>
          </ul>
        ))}
      </ul> */}
    </div>
  );
};

export default Sorting;
 