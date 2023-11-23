/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader, { Loader1 } from "../Progress";
import SubmitReview from "../ReviewsRatings/SubmitReview";
import Comment from "../ReviewsRatings/Comment";
import Image from "next/image";
import dynamic from "next/dynamic";
const ReviewShow = dynamic(() => import("../ReviewsRatings/ReviewShow"), {
  loading: () => <p>Loading...</p>,
});

function DynamicTabs() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.Product.items);
  const Id = useSelector((state) => state.Reviews.ProductOrderId);

  const filteredItems = useMemo(
    () => cartItems.filter((item) => item._id === Id),
    [cartItems, Id]
  );

  console.log("This is the first id of detailed Dynamic Id ??", Id);

  const filteredSimilar = useMemo(
    () =>
      cartItems.filter(
        (item) =>
          item.category === filteredItems[0]?.category &&
          item.title !== filteredItems[0]?.title
      ),
    [cartItems, filteredItems]
  );

  const detailedProduct = useSelector((state) => state.Product.detailedProduct);

  if (!detailedProduct) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Loader1 />;
      </div>
    );
  }

  const {
    title,
    model,
    subcategory,
    description,
    legalDisclaimer,
    manufacturingInfo,
  } = detailedProduct;

  const goToCardDetailsPage = (id) => {
    router.push(`/CardDetails/${id}`);
  };

  return (
    <div className="container  mb-5 mt-5">
      <div className="row gx-4">
        <div className="col-lg-8 mb-4">
          <div className="border rounded-2 px-3 py-2 bg-white">
            <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <li className="nav-item d-flex" role="presentation">
                <a
                  className="nav-link d-flex align-items-center justify-content-center w-100 active"
                  id="ex1-tab-1"
                  data-mdb-toggle="pill"
                  href=" "
                  role="tab"
                  aria-controls="ex1-pills-1"
                  aria-selected="true"
                >
                  Specification
                </a>
              </li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div
                className="tab-pane fade show active"
                id="ex1-pills-1"
                role="tabpanel"
                aria-labelledby="ex1-tab-1"
              >
                <div>
                  <h6>
                    <strong>Title: </strong>
                  </h6>
                  <p>{title}</p>
                  <table className="table table-bordered mt-3 mb-5">
                    <tbody>
                      <tr className="active">
                        <th className="py-2">Model: </th>
                        <td className="py-2">{model}</td>
                      </tr>
                      <tr className="info">
                        <th className="py-2">Subcategory:</th>
                        <td className="py-2">{subcategory}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>
                    <strong>Descriptions: </strong>
                  </h6>
                  <p>{description}</p>
                  <h6>
                    <strong>Legal Disclaimer: </strong>
                  </h6>
                  <p>{legalDisclaimer}</p>
                  <h6>
                    <strong>Manufacturing Info: </strong>
                  </h6>
                  <p>{manufacturingInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4 border-5 border-info border">
          <h1>Similar Others Products</h1>
          <div className="row">
            {
            filteredSimilar.length >= 1 ? ( 
            filteredSimilar.slice(0, 2).map((item) => (
              <div
                key={item._id}
                className="col-md-6"
                onClick={() => goToCardDetailsPage(item._id)}
              >
                <div className="card mb-4">
                  <Image
                    src={item.images[0]}
                    height={100}
                    width={100}
                    layout="responsive"
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h6 className="  m-0 card-title text-center">
                      {item.title}
                    </h6>
                    <p className="card-text text-start ms-2 fw-bold my-1">
                      Price: ₹{item.price}
                    </p>
                    <button
                      className="btn btn-info"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
            ):(<div  className="d-flex justify-content-center my-5"><Loader/></div>)
            }
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default React.memo(DynamicTabs);
