import React from 'react'

const Filter = () => {
  return (
    <div>
            <select
        className="form-select"
        aria-label="Default select example"
        // onChange={(e) => setSortingOption(e.target.value)}
      >
        <option defaultValue>Filter</option>
        <option value="des_price">CateGory </option>
        <option value="asc_price">Stars</option>
        <option value="ratings">Price b/w</option>
    
      </select>
    </div>
  )
}

export default Filter;