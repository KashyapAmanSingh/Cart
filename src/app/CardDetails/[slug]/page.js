/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from "react";

import Detail1 from "@/Component/Detail/Detail1";
import DynamicTabs from "@/Component/Detail/Detail2";
import StarRating from "@/Component/ReviewsRatings/Ratings";
import Comment from "@/Component/ReviewsRatings/Comment";
import { addProductOrderId } from "@/redux/ReviewSlice";
   import { useDispatch } from "react-redux";
 
const Page = ({ params }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
    dispatch(addProductOrderId(params.slug));
  // }, [params ,dispatch ]);
 
  return (
    <>
      <Detail1   />
      <DynamicTabs  />
      <StarRating  />
 
        < Comment/>



    </>
  );
};

export default Page;































// import React from 'react';
// import { useSelector } from 'react-redux';

// const CardDetailsPage = ({ params }) => {
//   const cartItems = useSelector((state) => state.Product.items);

//    const filteredItems = cartItems.filter((item) => item._id == params.slug);

//   return (
//     <div>
//       <h1>Card Details Page for ID: {params.slug}</h1>
//       <h2>Filtered Items:</h2>
//       <ul>
//         {filteredItems.map((item) => (
//           <li key={item._id}>
//             <h5>
//               {item.title} - Price: ${item.price}
//             </h5>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CardDetailsPage;

{
  /* <Detail id={params.slug}/> */
}
