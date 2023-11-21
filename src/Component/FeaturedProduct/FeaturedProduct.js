"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// const FeaturedProduct = () => {
// const cartItems = useSelector((state) => state.Product.items);
// const [is_featuredItems, setIsFeaturedItems] = useState([]);

// useEffect(() => {
//   const featuredItems = cartItems.filter((item) => item.is_featured === true);
//   setIsFeaturedItems(featuredItems);
// }, [cartItems]);

//   return (
//     <Carousel showThumbs={false}>
//       {is_featuredItems.map(({ title, images }, index) => (
//         <div key={index} style={{ width: "100%", height: "70vh" }}>
//           <Image
//             src={images[2]}
//             alt={title}
//             layout="responsive"
//             objectFit="cover"
//             height={100}
//             width={100}
//           />{" "}
//           <p className="legend">{title}</p>
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default FeaturedProduct;

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

        <div className="carousel-inner">
          {is_featuredItems.map(({ title, images }, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={{ width: "100%", height: "70vh" }}
            >
              <Image
                src={images[2]}
                alt={title}
                layout="responsive"
                objectFit="cover"
                height={50}
                width={100}
              />
              <div className="carousel-caption">
                <h6 className="text-white fw-bold">{title}</h6>
                {/* You can add additional content or remove the following line */}
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
