import React from "react";

import Image from "next/image";
 
 import noProduct from "../../../public/images/noProduct.jpg";

const Not_found_Product = () => {
  return (
    <div>
      <h1 className="text-center text-secondary fs-1 mt-0 fw-bold mb-0 ">No matching products found</h1>
      <Image
        priority
        src={noProduct}
        height={700}
        width={680}
        className="mx-auto d-block p-0 m-0"
        alt="No matching products found"
      />
    </div>
  );
};

export default Not_found_Product;
