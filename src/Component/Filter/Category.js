import React, { useEffect, useState } from "react";
import CategoryPrice from "./CategoryPrice";
import CategoryAssure from "./CategoryAssure";
import { useDispatch, useSelector } from "react-redux";
 import { filteredCategoryQuery } from "@/redux/FilterSortSlice";
 import Filter from "./Filter";

const Category = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // const [filterData, setfilterData] = useState([]);
  // const ProductItems = useSelector((state) => state.Product.items);
  
  useEffect(() => {
    // dispatch(filteredItem(filterData));
    dispatch(filteredCategoryQuery(selectedCategory));
  }, [selectedCategory]);

 
 
 
  //  const filterBy =  filteredCategoryQ  ;
  //  const filteredPrice=filteredPriceQuery ;

  // useEffect(() => {
  //   if (selectedCategory === "All") {
  //     setfilterData(ProductItems);
  //   } else {
  //     const filteredItems = ProductItems.filter(
  //       (item) => item.category === selectedCategory
  //     );
  //     setfilterData(filteredItems);
  //   }
  // }, [selectedCategory]);

  // const sortQuery = useSelector((state) => state.FilterSortSlice.sortQuery);
  // const filteredCategoryQ = useSelector((state) => state.FilterSortSlice.filteredCategoryQuery);
  // const filteredPriceQuery = useSelector((state) => state.FilterSortSlice.filteredPriceQuery);

  // const apiUrl = '/api/fetchProduct';

  //  const queryParams = {};

  // if (sortQuery) {
  //   queryParams.sortBy = sortQuery;
  // }

  // if (filteredCategoryQ) {
  //   queryParams.filterBy = filteredCategoryQ;
  // }

  // if (filteredPriceQuery && filteredPriceQuery.length > 0) {
  //   queryParams.filteredPriceQuery1 = filteredPriceQuery[0];
  //   queryParams.filteredPriceQuery2 = filteredPriceQuery[1];
  // }

  // // Use the URLSearchParams API to construct the query string
  // const params = new URLSearchParams(queryParams).toString();

  // // Combine the URL with the query string
  // const fullApiUrl = apiUrl + (params ? `?${params}` : '');

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

      <div>
        <CategoryPrice />
      </div>
      <div
        className="  mt-2  d-flex align-items-center justify-content-center
 "
      >
        <CategoryAssure />
      </div>

      <div>
        <Filter  />
      </div>
    </>
  );
};

export default Category;
