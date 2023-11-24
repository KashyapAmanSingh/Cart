/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const BuyedItem = () => {
  return (
    <div>
      <div className="container mt-5 mx-2">
        <div className="card" style={{ width: "18rem;" }}>
          <Image
            src="https://static.toiimg.com/thumb/msid-85251243,width-1280,resizemode-4/85251243.jpg"
            className="card-img-top"
            alt="Product Image"
            height={100}
            width={100}

          />
          <div className="card-body">
            <p className="card-text">Wizard Protein</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Price: $19.99</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyedItem;
