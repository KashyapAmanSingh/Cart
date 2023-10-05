import { filteredPriceQuery } from "@/redux/FilterSortSlice";
import { filteredItem } from "@/redux/ProductSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const CategoryPrice = () => {
  const [selectedCategoryPrice, setSelectedCategoryPrice] = useState("All");
  const Price = ["All", "100-500", "500-2000", "2000-5000", "Over 6000"];
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategoryPrice === "Over 6000") {
      // Handle the case for "Over 6000"
      dispatch(filteredPriceQuery([6000, Number.MAX_SAFE_INTEGER]));
    } else {
       const myPriceRangeArray = selectedCategoryPrice
        .split("-")
        .map(Number);

      dispatch(filteredPriceQuery(myPriceRangeArray));
    }
  }, [selectedCategoryPrice, dispatch]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategoryPrice(selectedValue);
  };

  return (
    <div>
      <h5>Price:</h5>

      {Price.map((category) => (
        <div
          key={category}
          className="form-check form-check-label d-flex align-items-center     mt-2 mb-2"
        >
          <input
            type="radio"
            name="priceFilter"
            id={`price-${category}`}
            value={category}
            checked={selectedCategoryPrice === category}
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
            htmlFor={`price-${category}`}
            className="form-check-label "
            style={{
              fontSize: "16px",
              verticalAlign: "middle",
              marginTop: "0",
              marginBottom: "0",
            }}
          >
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryPrice;
