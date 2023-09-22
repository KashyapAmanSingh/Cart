/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import axios from "axios";
import { addItem } from '@/redux/Slice';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';

const  MainPage = () => {
  const [data, setDatas] = useState([]);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(
      addItem ({
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
          setDatas(response.data.products);
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
           width={200} // Set an appropriate width in pixels
           height={200} // Set an appropriate height in pixels
    src={product.images[0]}
    className="card-img-top"
    alt={product.title}
  />
                <div className="card-body">
                  <h5 className="card-title">{product.title.slice(0, 70)}</h5>
                  <br/>
                  <h5 className="card-title">Price:-{product.price}</h5>
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

// export const Page = () => {
//   const cartItems = useSelector((state) => state.cart.items);

  // return (
  //   <div>
  //     <h1>cartItems ------------cartItems-------</h1>
  //     {cartItems.map((item, i) => (
  //       <ul key={i}>
  //         <li>
  //           <div className="cartCard">
  //             <h5>{item.title}</h5>

  //             <h5>{item.price}</h5>
  //             <Image  src={item.image} alt={item.title}  
  //               width={200} // Set an appropriate width in pixels
  //               height={200} // Set an appropriate height in pixels
            
  // />
  //           </div>
  //         </li>
  //       </ul>
  //     ))}
  //   </div>
  // );
// };

export default  MainPage;
