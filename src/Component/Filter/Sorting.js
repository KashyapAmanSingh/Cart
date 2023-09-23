"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { sortedItem } from "@/redux/ProductSlice";
 
const Sorting = () => {
  const dispatch=useDispatch();
  const [sortingOption, setSortingOption] = useState();
  const [sortedData, setSortedData] = useState([]);

 
  console.log("Response data from sorted component file js :", sortedData );

  useEffect(() => {
    const fetchData = async () => {
// Inside your fetchData function
if (sortingOption) {
  try {
    console.log("Fetching data with sortingOption:", sortingOption);
    const response = await axios.get(`/api/fetchProduct?sortBy=${sortingOption}`);
             // Dispatch the sorted data into Redux store
             dispatch(sortedItem(response.data.products));
    // Add these debugging lines
    // console.log("Response data:", response.data.products);
    // console.log("Discount values before sorting:", response.data.products.map(item => item.discount));
    // //  console.log("Ratings values before sorting:", response.data.products.map(item => item.ratings));

    setSortedData(response.data.products);
  } catch (error) {
    console.error("Error fetching data: /api/fetchProduct?sortBy ", error);
  }
}

    };

    fetchData();
  }, [sortingOption, dispatch]);
  // console.log("Discount values after sorting:", sortedData.map(item => item.discount));
    //  console.log("Ratings values after sorting:", sortedData.map(item => item.ratings));

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

      {/* <ul className="container-fluid">
  <div className="row">
    {sortedData.map((item, i) => (
      <div className="col-md-2 mb-5 mt-4" key={i}>
        <div className="card">
          <Image
            src={item.images[0]}
            alt={item.title}
            className="card-img-top"
            width={200}
            height={200}
          />
          <div className="card-body">
            <h5 className="card-title">{item.title.slice(0,30)}</h5>
            <p className="card-text">Price: ${item.price}</p>
            <p className="card-text">Ratings: {item.ratings}</p>
            <p className="card-text">Discount: {item.discount}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</ul> */}

    </div>
  );
};

export default Sorting;
  