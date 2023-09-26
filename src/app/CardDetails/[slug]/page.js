/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import Detail1 from "@/Component/Detail/Detail1";
import DynamicTabs from "@/Component/Detail/Detail2";

const page = ({ params }) => {
  return (
    <>
      <Detail1 id={params} />
      <DynamicTabs id={params} />
    </>
  );
};

export default page;































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
