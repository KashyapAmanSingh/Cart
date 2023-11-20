import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FeaturedProduct = () => {
  const cartItems = useSelector((state) => state.Product.items);
  const [is_featuredItems, setIsFeaturedItems] = useState([]);

  useEffect(() => {
    const featuredItems = cartItems.filter((item) => item.is_featured === true);
    setIsFeaturedItems(featuredItems);
  }, [cartItems]);

  return (
    <Carousel showThumbs={false}>
      {is_featuredItems.map(({ title, images }, index) => (
        <div key={index} style={{ width: "100%", height: "70vh" }}>
          <Image
            src={images[2]}
            alt={title}
            layout="responsive"
            objectFit="cover"
            height={100}
            width={100}
          />{" "}
          <p className="legend">{title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default FeaturedProduct;
