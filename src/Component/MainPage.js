/* eslint-disable @next/next/no-img-element */

"use client";
import React, { useEffect, Suspense } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Loader1 from "./Progress";
import Functions, {
  HandleAddToCartBtn,
  HandleCartImage,
} from "@/utils/Functions";
import Not_found_Product from "./not_found_Product/not_found_Product";

const WishList = dynamic(() => import("./WishList/WishList"));
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
          <div className="col-md-3 col-lg-2 d-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline categ">
            <Suspense fallback={<div>Loading Category...</div>}>
              <Category />
            </Suspense>
          </div>

          <div className="col-sm-12 col-md-9 col-lg-10  p-0 ">
            <div className="row  border border-1 border-muted mx-0">
              <div className="someClass p-0  ">
                {loading ? (
                  // If loading is true, show a loader1 component
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ height: "100vh" }}
                  >
                    <Loader1 />
                  </div>
                ) : (
                  <div className="mb-3 ">
                    <FeaturedProduct />
                  </div>
                )}
              </div>

              <div className="row mx-0">
     
                {data && data.length >= 1 && (
                  <h1 className="text-center mt-0">Our Products</h1>
                )}
                       
                {data && data.length >= 1 ? (
                  data.map((product) => (
                    <div
                      className="col-lg-4 col-xl-3 mx-auto col-sm-6  col-12 mt-3"
                      key={product._id}
                    >
                      <div
                        className="card mx-auto border border-1 border-dark "
                        style={{ width: "16rem", height: "22rem" }}
                      >
                        <div className="cart_image  mt-1 ">
                          <WishList wishProductDetail={product} />

                          <HandleCartImage
                            src={product.images[0]}
                            alt={product.title}
                            id={product._id}
                          />
                        </div>

                        <div className="card-body  ">
                          <h6 className="card-title ">
                            {product.title.slice(0, 80)}
                          </h6>

                          <h6 className="card-title text-start">
                            Price: ₹{product.price}
                          </h6>
                          <h6 className="card-title  m-0">
                            Rankings: {product.ratings}
                          </h6>
                          <h5 className="card-title mb-0">
                            Discount: -{product.discount}
                            <span className="  mb-0 text-danger fw-bold">
                              %
                            </span>
                          </h5>
                          <div className="addCartBtn  ">
                            <HandleAddToCartBtn product={product} />
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <Not_found_Product />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
