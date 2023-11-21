/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";

import Loader, { Loader1 } from "./Progress";
import Functions, {
  HandleAddToCartBtn,
  HandleCartImage,
} from "@/utils/Functions";
import WishList from "./WishList/WishList";
import OffCanvaSideBar from "@/app/SideBarCanvas/OffCanvaSideBar";

const Category = dynamic(() => import("./Filter/Category"), {
  suspense: true,
});

const FeaturedProduct = dynamic(() =>
  import("./FeaturedProduct/FeaturedProduct")
);

const MainPage = () => {
  const sortedData = useSelector((state) => state.Product.items);
  const { fetchProducts, apiUrl, loading } = Functions();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, apiUrl, loading]);

  let data = sortedData;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 mt-5 d-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline categ">
            <Suspense fallback={<div>Loading Category...</div>}>
              <Category />
            </Suspense>
          </div>
        
          <div className="col-sm-12 col-md-9 col-lg-10  p-0 ">
            <div className="row">
              <div className="someClass">
                {loading ? (
                  // If loading is true, show a loader component
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "100vh" }}
                  >
                    <Loader />
                  </div>
                ) : (
                  <div
                  className="mt-5 pt-0 border border-3 border-info mb-5"
                 >
                   <FeaturedProduct />
                   </div>
                )}
              </div>

              <div className="row mx-0">
                {data &&
                  data.map((product) => (
                    <div className="col-lg-4 col-xl-3 mx-auto col-sm-6  col-12 mt-5" key={product._id}>
                      <div className="card mx-auto border border-1 border-dark " style={{ width: "16rem",height:"22rem" }}>
                       
                        <div className="cart_image ">
                        <WishList wishProductDetail={product} />

                          <HandleCartImage
                            src={product.images[0]}
                            alt={product.title}
                            id={product._id}
                           />
                          
                        </div>
                        
                        <div className="card-body  ">
                          <h6 className="card-title ">
                            {product.title.slice(0, 90)}
                          </h6>
           
                          <h6 className="card-title text-start m-0">Price: ₹{product.price}</h6>
                          <h6 className="card-title  m-0">
                            Rankings: {product.ratings}
                          </h6>
                          <h5 className="card-title mb-0">
                            Discount: -{product.discount}<span className="  mb-0 text-danger fw-bold">%</span>
                          </h5>
                             <div className="addCartBtn  ">
                          <HandleAddToCartBtn product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
