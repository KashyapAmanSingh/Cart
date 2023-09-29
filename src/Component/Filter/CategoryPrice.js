import { filteredPriceQuery } from '@/redux/FilterSortSlice';
import { filteredItem } from '@/redux/ProductSlice';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CategoryPrice = () => {
  const [selectedCategoryPrice, setSelectedCategoryPrice] = useState("All");
  const Price = ["All", "100-500", "500-2000", "2000-5000", "Over 6000"];
  const dispatch = useDispatch();

  const myPriceRangeArray = useMemo(() => {
    const rangeValues = selectedCategoryPrice.split('-');
    const PricesRange1 = parseInt(rangeValues[0]);
    const PricesRange2 = parseInt(rangeValues[1]);
    return [PricesRange1, PricesRange2];
  }, [selectedCategoryPrice]);

  useEffect(() => {
    dispatch(filteredPriceQuery(myPriceRangeArray));
  }, [selectedCategoryPrice, myPriceRangeArray, dispatch]);
      

  //  console.log("=====>>>>>>>>RangeValues <<<<<<========", rangeValues[0]  ,rangeValues[1] ,rangeValues ,typeof(parseInt(rangeValues[0])),  "========>>>>>>>>RangeValues<<<<<<<<<<<=========")

  //  setSelectedCategoryPrice 2000-5000 ========>>>>>>>>  So <<<<<<<<<<<=========  
  //  =====>>>>>>>>TYPE<<<<<<======== string ========>>>>>>>> TYPE <<<<<<<<<<<=========


    // const [filterData, setfilterData] = useState([]);
      const cartItems = useSelector((state) => state.Product.items);
  

    // useEffect(() => {
    //   dispatch(filteredItem(filterData));
    // }, [filterData]);
  
    // useEffect(() => {
    //   if (selectedCategoryPrice === "All") {
    //     setfilterData(cartItems);
    //   } else {
    //     const filteredItems = cartItems.filter(
    //       (item) => item.category === selectedCategory
    //     );
    //     setfilterData(filteredItems);
    //   }
    // }, [selectedCategory]);
    const handleRadioChange = (event) => {
      const selectedValue = event.target.value;
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