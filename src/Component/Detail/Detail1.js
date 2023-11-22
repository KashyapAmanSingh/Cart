import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalOffer } from "react-icons/md";
import Loader from "../Progress";
import dynamic from "next/dynamic";
import { addItem } from "@/redux/Slice";
import Image from "next/image";
import DetailImage from "./DetailImage";

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

  const {
    title,
    images,
    stock,
    price,
    discount,
    brand,
    category,
    seller,
    size,
  } = detailedProduct || {};

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
    <div className="container  mt-5">
      <div className="row  ">
        {/* Parent Column (col-sm-8) */}
        <div className="col-lg-6  col-sm-6 mt-3  mb-0    ">
          {/* col-lg-5 col-md-6 */}

          <div className="row">
            {/* Child Column (col-sm-7) */}
            <div
              className=" col-md-10  mx-auto mt-5 border border-1 border-dark "
              style={{
                height: "25rem",
                width: "24rem",
                position: "relative",
              }}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={images[0]}
                // className="mx-auto"
                alt={title.slice(0, 20)}
              />
            </div>
          </div>
          <div className="row mx-auto">
            <div className=" d-flex justify-space-around mt-1 ms-sm-0  col-sm-12 mx-1 p-0 mb-5 ">
              {/* First Child Column (col-sm-12) */}
              <div
                className="vice_image1 mx-auto my-1 border-2 border-secondary border"
                style={{
                  height: "7rem",
                  width: "7rem",
                  position: "relative",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={images[1]}
                  alt={title}
                />
              </div>

              {/* Second Child Column (col-sm-6) */}

              <div
                className="vice_image1 mx-auto my-1 border-2 border-secondary border"
                style={{
                  height: "7rem",
                  width: "7rem",
                  position: "relative",
                }}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={images[2]}
                  alt={title}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6   col-sm-6   mt-3 mx-auto">
          {/* <!-- Product Details --> */}
          <h4 className="title  mt-5 mb-3 text-justify  fw-bold fs-6 ">{title}</h4>
          <div className="d-flex align-items-center">
            <div className="rating">
              {/* <!-- Insert star rating here --> */}
            </div>
            <span className="text-muted   mb-2 btn btn-warning">
              154 orders
            </span>

            <span className="text-dark  ms-1 mb-2 btn btn-info">
              In stock:{stock}
            </span>
          </div>
          <div className="price mb-3 mt-3">
            <span className="h4 mb-3 fs-5 ">
              <MdOutlineLocalOffer />
              Price:&#8377;{price}
            </span>
            <span className=" h4 text-muted fs-5 mx-2">
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

          <div className="d-flex  ">
            <div className=" me-4 ms-2">
              <CheckoutButton />
            </div>
            <button className="btn btn-info   " onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Detail1);
