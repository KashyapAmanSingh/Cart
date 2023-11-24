"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
 
 

const FeaturedProduct = () => {
  const cartItems = useSelector((state) => state.Product.items);
  const [is_featuredItems, setIsFeaturedItems] = useState([]);

  useEffect(() => {
    const featuredItems = cartItems.filter((item) => item.is_featured === true);
    setIsFeaturedItems(featuredItems);
  }, [cartItems]);
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return (
    <div>
      <div id="demo" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {is_featuredItems.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
            ></button>
          ))}
        </div>

        <div className="carousel-inner" >
          {is_featuredItems.map(({ title, images }, index) => (
            <div
              key={index}
              className={`carousel-item FeatureProductCarousal ${index === 0 ? "active" : ""}`}
             >
              <Image src={images[2]} alt={title} layout="fill" />
              <div className="carousel-caption">
                <h6 className="d-none d-sm-none d-md-block  text-white fw-bold">
                  {title}
                </h6>
               </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#demo"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
        </button>
      </div>
    </div>
  );
};

export default FeaturedProduct;
