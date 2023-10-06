import { filteredAssured } from "@/redux/FilterSortSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CategoryAssure = () => {
  const dispatch = useDispatch();
  const [selectedAssured, setSelectedAssured] = useState("");

  const handleRadioChange = (event) => {
    setSelectedAssured(event.target.value);
    dispatch(filteredAssured(event.target.value));
  };
  // console.log(
  //   selectedAssured,
  //   typeof selectedAssured,
  //   "<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~This CategoryAssure ----is Fully Selecred price yet"
  // );
  return (
    <div className="assured fw-bold d-flex align-items-center justify-content-center">
      <input
        type="checkbox"
        name="Assured"
        id="Assured"
        value={selectedAssured === "Assured" ? "" : "Assured"}
        checked={selectedAssured === "Assured"}
        onChange={handleRadioChange}
        className="form-check-input mt-3 mb-3"
        style={{ width: "25px", height: "25px" }}
      />

      <label
        htmlFor="Assured"
        className="form-check-label mx-4 "
        style={{ fontSize: "19px" }}
      >
        Assured
      </label>
    </div>
  );
};

export default CategoryAssure;
