/* eslint-disable @next/next/no-img-element */

 import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalOffer } from "react-icons/md";
import Loader from "../Progress";
import dynamic from "next/dynamic";
import { addItem } from "@/redux/Slice";


const CheckoutButton = dynamic(() => import("@/Compo/checkoutform"));
 


const Detail1 = () => {
  const dispatch = useDispatch();

  const detailedProduct = useSelector((state) => state.Product.detailedProduct);

  if (!detailedProduct) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader />;
      </div>
    );
  }

  const { title, images, stock, price, discount, brand, category, seller, size } =
    detailedProduct || {};

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: detailedProduct._id,
        title: detailedProduct.title,
        image: detailedProduct.images[0],
        price: detailedProduct.price,
      })
    );
  };

  return (
    <div>
      <div>
     
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 mt-5 mb-5 ">
              <div className="vice_image1  border-3 border-warning border">
                <img src={images[1]} alt={title} className="img-fluid" />
              </div>

              <div className="vice_image1 mt-2  border-3 border-warning border">
                <img src={images[2]} alt={title} className="img-fluid" />
              </div>
            </div>

            <div className="col-md-4 border-3 border-warning border mt-4 ">
              <img src={images[0]} alt={title} className="img-fluid" />
            </div>
            <div className="col-md-6 mt-5">
              {/* <!-- Product Details --> */}
              <h4 className="title mt-3 mb-3 text-left fw-bold">{title}</h4>
              <div className="d-flex align-items-center">
                <div className="rating">
                  {/* <!-- Insert star rating here --> */}
                </div>
                <span className="text-muted mx-1 mb-2 btn btn-warning">
                  154 orders
                </span>
                <span className="text-dark mx-4 mb-2 btn btn-info">
                  In stock:{stock}
                </span>
              </div>
              <div className="price mb-3 mt-3">
                <span className="h4 mb-3 fw-medium">
                  <MdOutlineLocalOffer />
                  Price:&#8377;{price}
                </span>
                <span className=" h4 text-muted  mx-4">
                  Discount:{discount}%
                </span>
                {/* <span className="text-muted">Assured:{tags}</span> */}
              </div>
              {/* <p>{description.slice(0, 190)}</p> */}
              {/* <!-- Specifications --> */}
              <table className="table table-bordered mt-4  mb-3">
                <tbody>
                  <tr className="active">
                    <th className="py-2">Brand: </th>
                    <td className="py-2"> {brand}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Category: </th>
                    <td className="py-2"> {category}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Seller::</th>
                    <td className="py-2"> {seller}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Size:</th>
                    <td className="py-2">{size}</td>
                  </tr>
                </tbody>
              </table>

              <div className="d-flex mb-4 my-4 ">
                <div className="">
                <Suspense fallback={<div>Loading...</div>}>
        <CheckoutButton />
      </Suspense>
                </div>
                <button
                  className="btn btn-info btn-md mx-5 mb-4"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail1;
