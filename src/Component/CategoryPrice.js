import React, { useState } from 'react'

const CategoryPrice = () => {

    const [selectedCategoryPrice, setSelectedCategoryPrice] = useState("All");
    const Price = ["All", "100-500", "500-2000", "2000-5000", "Over 6000"];


    // console.log("setSelectedCategoryPrice", selectedCategoryPrice)
    // console.log("setSelectedCategoryPrice Type", typeof(selectedCategoryPrice))

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
         // handleCategoryChange(selectedValue);
        setSelectedCategoryPrice(selectedValue);
    
      };
  return (
    <div>
            <h5>Price:</h5>
        
            {Price.map((category) => (
  <div key={category} className="form-check form-check-label d-flex align-items-center     mt-2 mb-2">
    <input
      type="radio"
      name="priceFilter" 
      id={`price-${category}`}  
      value={category}
      checked={selectedCategoryPrice === category}
      onChange={handleRadioChange}
      className="form-check-input"
      style={{  width: '25px', height: '25px', marginTop: '0', marginBottom: '0' }}
    />

    <label htmlFor={`price-${category}`} className="form-check-label " style={{ fontSize: '16px', verticalAlign: 'middle', marginTop: '0', marginBottom: '0' }}>
      {category}
    </label>
  </div>
))}


 
 
    </div>
  )
}

export default CategoryPrice