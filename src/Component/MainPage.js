/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { addItem } from "@/redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { homeItem } from "@/redux/ProductSlice";
import Category from "./Filter/Category";
import { useRouter } from "next/navigation";
import FilterSortQuery from "./Filter/FilterSortQuery";
import FeaturedProduct from "./FeaturedProduct/FeaturedProduct";

const MainPage = () => {
  const [data, setDatas] = useState([]);
  const router = useRouter();

  const dispatch = useDispatch();
  const sortedData = useSelector((state) => state.Product.items);
  const  AllDatas = useSelector((state) => state.Product.items);




  useEffect(() => {
    if (sortedData != null) {
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
  const apiUrl = FilterSortQuery();
  console.log(apiUrl, "from MainPage");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (apiUrl === "/api/fetchProduct&sortBy=") {
          response = await axios.get("/api/fetchProduct");
        } else {
          response = await axios.get(apiUrl);
        }

        // console.log(response, "response Datas response loaded");
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

  const goToCardDetailsPage = (id) => {
    router.push(`/CardDetails/${id}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2 categ">
          <Category />
        </div>

        <div className="col-sm-10">
          <div className="row">
          <div className="someClass">
              {  <FeaturedProduct />}   
             </div>
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
                      onClick={() => goToCardDetailsPage(product._id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.title.slice(0, 70)}
                      </h5>
                      <br />
                      <h5 className="card-title">Price: {product.price}</h5>
                      <h5 className="card-title">
                        Rankings: {product.ratings}
                      </h5>
                      <h5 className="card-title">
                        Discount: {product.discount}
                      </h5>

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
      </div>
    </div>
  );
};


 
export default MainPage;

