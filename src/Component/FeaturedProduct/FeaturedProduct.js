/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSelector } from 'react-redux';
 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedProduct = () => {

    const cartItems = useSelector((state) => state.Product.items);
    const is_featuredItems = cartItems.filter((item) => item.is_featured=== true);
console.log(is_featuredItems,"------------->is_featuredItems<---------------")

  return (
    <Carousel showThumbs={false}>  
      <div >
      <img src={is_featuredItems[1].images[2]} alt="Los Angeles" className="d-block"  style={{ width: '100%',height:'70vh' }} // Use an object to define styles
/>
          <p className="legend">{is_featuredItems[1].title}</p>
      </div>
      <div>
      <img src={is_featuredItems[2].images[2]} alt="Chicago" className="d-block"  style={{ width: '100%',height:'70vh' }} // Use an object to define styles
/>        <p className="legend">{is_featuredItems[2].title}</p>
      </div>
      <div>
      <img  src={is_featuredItems[3].images[2]} alt="New York" className="d-block"  style={{ width: '100%',height:'70vh' }} // Use an object to define styles
/>      
  <p className="legend">{is_featuredItems[3].title}</p> 
 
      </div>
    </Carousel>
 
  );
};

 

export default FeaturedProduct