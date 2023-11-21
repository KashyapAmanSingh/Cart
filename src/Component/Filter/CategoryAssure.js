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

  return (
    <div className="assured fw-bold d-flex align-items-center justify-content-center ms-4">
      <input
        type="checkbox"
        name="Assured"
        id="Assured"
        value={selectedAssured === "Assured" ? "" : "Assured"}
        checked={selectedAssured === "Assured"}
        onChange={handleRadioChange}
        className="form-check-input mt-3 mb-3 border border-1 border-dark"
        style={{ width: "20px", height: "20px" }}
      />
  
      <label
        htmlFor="Assured"
        className="form-check-label mx-3"
        style={{ fontSize: "15px" }}
      >
        Assured
      </label>
    </div>
  );
  
};

export default CategoryAssure;
