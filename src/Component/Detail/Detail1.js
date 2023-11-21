import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalOffer } from "react-icons/md";
import Loader from "../Progress";
import dynamic from "next/dynamic";
import { addItem } from "@/redux/Slice";
import Image from "next/image";

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
    <div>
      <div>
        <div className="container  mt-5">
          <div className="row  ">
            <div className="col-sm-1 mt-5  col-lg-2 col-md-2 p-0    mb-5 border border-1 border-info">
              <div className="vice_image1 mt-5 border-1 border-secondary border">
                <Image height={100} width={100} src={images[1]} alt={title} />
              </div>
              <div className="vice_image1 mt-2 border-1 border-secondary border">
                <Image height={100} width={100} src={images[2]} alt={title} />
              </div>
            </div>

            <div className="col-sm-5  col-lg-5 col-md-5 mt-5  p-0 border border-1 border-danger mt-4">
              <div
                className="responsive-image-container w-100 h-100"
                style={{   position: "relative" }}
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={images[0]}
                  alt={title}
                />
              </div>
            </div>

            <div className="col-sm-6  col-lg-5 col-md-5 border border-1 border-danger mt-5 mx-auto">
              {/* <!-- Product Details --> */}
              <h4 className="title mt-3 mb-3 text-left  fw-bold fs-6">
                {title}
              </h4>
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
      </div>
    </div>
  );
};

export default React.memo(Detail1);
