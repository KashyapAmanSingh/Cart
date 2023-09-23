import React, { useEffect, useState } from "react";
import CategoryPrice from "./CategoryPrice";
import CategoryAssure from "./CategoryAssure";
import { useDispatch, useSelector } from "react-redux";
import { filteredItem } from "@/redux/ProductSlice";

const Category = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filterData, setfilterData] = useState([]);
  const cartItems = useSelector((state) => state.Product.items);

  useEffect(() => {
    dispatch(filteredItem(filterData));
  }, [filterData]);

  useEffect(() => {


    if (selectedCategory==="All") {
      setfilterData(cartItems);
    }else{
      const filteredItems = cartItems.filter(
        (item) => item.category === selectedCategory
      );
      setfilterData(filteredItems);
    }
   
  }, [selectedCategory]);

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
              style={{ fontSize: "16px" }} // Adjust the font size as needed
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
    </>
  );
};

export default Category;
