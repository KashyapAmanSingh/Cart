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

const Category = dynamic(() => import("./Filter/Category"), {
  suspense: true,
});

const FeaturedProduct = dynamic(
  () => import("./FeaturedProduct/FeaturedProduct"),
  {
    suspense: true,
  }
);

const MainPage = () => {
  const sortedData = useSelector((state) => state.Product.items);
  const { fetchProducts, apiUrl, loading } = Functions();

  useEffect(() => {
    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, [fetchProducts, apiUrl, loading]);

  let data = sortedData;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 categ">
            <Suspense fallback={<div>Loading Category...</div>}>
              <Category />
            </Suspense>
          </div>

          <div className="col-sm-10">
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
                  // If loading is false, show the FeaturedProduct component with suspense fallback
                  <Suspense fallback={<div>Loading FeaturedProduct...</div>}>
                    <FeaturedProduct />
                  </Suspense>
                )}
      </div>
        
                  <div className="row">
                    {data &&
                      data.map((product) => (
                        <div className="col-md-3 mt-5" key={product._id}>
                          <div className="card" style={{ width: "18rem" }}>
                            <HandleCartImage
                              src={product.images[0]}
                              alt={product.title}
                              id={product._id}
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {product.title.slice(0, 70)}
                              </h5>
                              <br />
                              <h5 className="card-title">
                                Price: {product.price}
                              </h5>
                              <h5 className="card-title">
                                Rankings: {product.ratings}
                              </h5>
                              <h5 className="card-title">
                                Discount: {product.discount}
                              </h5>

                              <HandleAddToCartBtn product={product} />
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






// import { fetchData } from "@/utils/FetchCode";
// import { homeItem } from "@/redux/ProductSlice";
// import FilterSortQuery from "./Filter/FilterSortQuery";
// const MainPage = () => {
//   // const [data, setDatas] = useState([]);
//   //  const [loading, setLoading] = useState(true);
//   // const { goToCardDetailsPage } = Functions();

//   // const apiUrl = FilterSortQuery();
//   // const dispatch = useDispatch();

//   const sortedData = useSelector((state) => state.Product.items);
//   const { fetchProducts, apiUrl, loading } = Functions();

//   useEffect(() => {
//     // Call the fetchProducts function when the component mounts
//     fetchProducts();
//   }, [fetchProducts, apiUrl, loading]);

//   let data = sortedData;

//   // useEffect(() => {
//   //   if (sortedData != null) {
//   //     setDatas(sortedData);
//   //   }
//   // }, [sortedData]);

//   //  useEffect(() => {
//   //   const fetchDataMain = async () => {
//   //     try {
//   //       const response = await fetchData(apiUrl); //|| "/api/fetchProduct"

//   //       if (response) {
//   //         const { products } = response.data;
//   //         dispatch(homeItem(products));
//   //         setLoading(false);
//   //       } else {
//   //         throw new Error("Network response was not ok");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchDataMain();
//   // }, [apiUrl, dispatch]);

//   return (
//     <>

//         <div className="container-fluid">
//           <div className="row">
//             <div className="col-sm-2 categ">
//               <Suspense fallback={<div>Loading Category...</div>}>
//                 <Category />
//               </Suspense>
//             </div>

//             <div className="col-sm-10">
//               <div className="row">
//                 <div className="someClass">
//                   <Suspense fallback={<div>Loading FeaturedProduct...</div>}>
//                     <FeaturedProduct />
//                   </Suspense>
//                 </div>

//                 {loading ? (
//         <div
//           className="d-flex align-items-center justify-content-center"
//           style={{ height: "100vh" }}
//         >
//           <Loader />
//         </div>
//       ) : (data &&
//                   data.map((product) => (
//                     <div className="col-md-3 mt-5" key={product._id}>
//                       <div className="card" style={{ width: "18rem" }}>
//                         <HandleCartImage
//                           src={product.images[0]}
//                           alt={product.title}
//                           id={product._id}
//                         />
//                         <div className="card-body">
//                           <h5 className="card-title">
//                             {product.title.slice(0, 70)}
//                           </h5>
//                           <br />
//                           <h5 className="card-title">Price: {product.price}</h5>
//                           <h5 className="card-title">
//                             Rankings: {product.ratings}
//                           </h5>
//                           <h5 className="card-title">
//                             Discount: {product.discount}
//                           </h5>

//                           <HandleAddToCartBtn product={product} />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MainPage;
/* eslint-disable @next/next/no-img-element */
