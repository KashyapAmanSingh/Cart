import React, { useState } from 'react';

const CategoryAssure = () => {
  const [selectedAssured, setSelectedAssured] = useState("All");

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedAssured(selectedValue);
  };

  return (
    <div className='assured fw-bold d-flex align-items-center justify-content-center'>
      <input
  type="checkbox" // Changed to checkbox input
  name="Assured"
  id="Assured"
  value="Assured"
  checked={selectedAssured === "Assured"} // Check if selectedAssured is equal to "Assured"
  onChange={handleRadioChange}
  className="form-check-input mt-3 mb-3"
  style={{ width: '25px', height: '25px' }}
/>

      <label htmlFor="Assured" className="form-check-label mx-4 " style={{ fontSize: '19px' }}>
        Assured
      </label>
    </div>
  );
};

export default CategoryAssure;
