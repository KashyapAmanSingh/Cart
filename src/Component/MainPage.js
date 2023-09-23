 /* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect, useState } from 'react';
import axios from "axios";
import { addItem } from '@/redux/Slice';
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import { homeItem } from '@/redux/ProductSlice';

const MainPage = () => {
  const [data, setDatas] = useState([]);
 

  const dispatch = useDispatch();
  const sortedData = useSelector((state) => state.Product.items);

  // Use a useEffect to update data when sortedData changes
  useEffect(() => {
    if (sortedData != null) {
      console.log(sortedData, "========>>>>>>>>  So <<<<<<<<<<<=========");
      setDatas(sortedData);
    }
  }, [sortedData]);

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
      })
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/fetchProduct");
        console.log(response, "response Datas response loaded");
        if (response.status === 200) {
          dispatch(homeItem(response.data.products));
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {data &&
          data.map((product) => (
            <div className="col-md-3 mt-5" key={product._id}>
              <div className="card" style={{ width: "18rem" }}>
                <Image
                  width={200}
                  height={200}
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title.slice(0, 70)}</h5>
                  <br />
                  <h5 className="card-title">Price:-{product.price}</h5>
                  <h5 className="card-title">Rrankings:-{product.ratings}</h5>
                  <h5 className="card-title">Ddiscount:-{product.discount}</h5>

                  <button
                    className="btn btn-info mt-3"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MainPage;
