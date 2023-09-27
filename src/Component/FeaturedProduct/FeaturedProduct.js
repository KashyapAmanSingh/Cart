/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedProduct = () => {
  const [is_featuredItems, setIsFeaturedItems] = useState(null);
  const cartItems = useSelector((state) => state.Product.items);

  useEffect(() => {
    const featuredItems = cartItems.filter((item) => item.is_featured === true);
    setIsFeaturedItems(featuredItems);
  }, [cartItems]);

  return (
    <Carousel showThumbs={false}>
      {is_featuredItems &&
        is_featuredItems.map((item, index) => (
          <div key={index}>
            <img src={item.images[2]} alt={item.title} className="d-block" style={{ width: '100%', height: '70vh' }} />
            <p className="legend">{item.title}</p>
          </div>
        ))}
    </Carousel>
  );
};

export default FeaturedProduct;
