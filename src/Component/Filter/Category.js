import React, { useEffect, useState,    Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredCategoryQuery } from "@/redux/FilterSortSlice";
import dynamic from "next/dynamic";

// Dynamic import of components
const CategoryPrice = dynamic(() => import("./CategoryPrice"));
const CategoryAssure = dynamic(() => import("./CategoryAssure"));
const Filter = dynamic(() => import("./Filter"));
// const MyErrorBoundary = dynamic(() => import("../path/to/MyErrorBoundary"), {
//   loading: () => <p>Loading Error Boundary...</p>,
// });



const Category = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // dispatch(filteredItem(filterData));
    dispatch(filteredCategoryQuery(selectedCategory));
  }, [selectedCategory,dispatch]);

  const categories = [
    "All",
    "Supplements",
    "Equipment",
    "Footwear",
    "Nutrition",
    "Others",
  ];

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  return (
    <>
      <div>
        <h4>Category:</h4>
        {categories.map((category) => (
          <div
            key={category}
            className="form-check form-check form-check-label d-flex align-items-center  mt-3 mb-2"
          >
            <input
              type="radio"
              name="category"
              id={category}
              value={category}
              checked={selectedCategory === category}
              onChange={handleRadioChange}
              className="form-check-input"
              style={{
                width: "25px",
                height: "25px",
                marginTop: "0",
                marginBottom: "0",
              }}
            />

            <label
              htmlFor={category}
              className="form-check-label"
              style={{ fontSize: "16px" }}
            >
              {category}
            </label>
          </div>
        ))}
      </div>
      {/* <MyErrorBoundary> */}

      <Suspense fallback={<div>Loading CategoryPrice ...</div>}>
        <CategoryPrice />
      </Suspense>
      {/* <MyErrorBoundary/> */}

      <div
        className="  mt-2  d-flex align-items-center justify-content-center
 "
      >

{/* <MyErrorBoundary> */}

        <Suspense fallback={<div>Loading CategoryAssure...</div>}>
          <CategoryAssure />
        </Suspense>
        {/* <MyErrorBoundary/> */}

      </div>

      <div>
      {/* <MyErrorBoundary> */}

        <Suspense fallback={<div>Loading Filter ...</div>}>
          <Filter />
        </Suspense>
        {/* <MyErrorBoundary/> */}

      </div>
    </>
  );
};

export default Category;
