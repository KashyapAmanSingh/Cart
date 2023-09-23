import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { addItem } from "@/redux/Slice";
import { homeItem } from "@/redux/ProductSlice";

const HomePage = () => {
  const [data, setDatas] = useState([]);
  const dispatch = useDispatch();

  // Use a useEffect to set data based on sortedData
  const sortedData = useSelector((state) => state.Product.items);
  useEffect(() => {
    if (sortedData != null) {
      console.log(sortedData, "========>>>>>>>>  So <<<<<<<<<<<=========");
      setDatas(sortedData);
    }
  }, [sortedData]);

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
      })
    );
  };

  return (
    <div className="container">
      <div className="row">
        {data &&
          data.map((product) => (
            <div className="col-md-3 mt-5" key={product._id}>
              <div className="card" style={{ width: "18rem" }}>
                <Image
                  width={200}
                  height={200}
                  src={product.images[0]}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title.slice(0, 70)}</h5>
                  <br />
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

export default HomePage;
