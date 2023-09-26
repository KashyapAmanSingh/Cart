import React from "react";
import { useSelector } from "react-redux";

const FilterSortQuery = () => {
  const sortQuery = useSelector((state) => state.FilterSortSlice.sortQuery);
  const filteredPriceQuery = useSelector(
    (state) => state.FilterSortSlice.filteredPriceQuery
  );
  const filteredCategoryQ = useSelector(
    (state) => state.FilterSortSlice.filteredCategoryQuery
  );
  
  const filteredSearchedQuery = useSelector(
    (state) => state.FilterSortSlice.filteredSearchedQuery
  );

console.log(filteredSearchedQuery ,"filteredSearchedQuery -----------------  filteredSearchedQuery ");
  
  let apiUrl = `/api/fetchProduct`;

  if (filteredCategoryQ) {
    apiUrl += `?filterBy=${filteredCategoryQ}`;
  }

  if (filteredPriceQuery && filteredPriceQuery.length > 0) {
    const filteredPriceQuery1 = filteredPriceQuery[0];
    const filteredPriceQuery2 = filteredPriceQuery[1];
    apiUrl += `&filteredPriceQuery1=${filteredPriceQuery1}&filteredPriceQuery2=${filteredPriceQuery2}`;
  }
  if (sortQuery) {
    apiUrl += `&sortBy=${sortQuery}`;
  }
  if(filteredSearchedQuery){
    apiUrl += `&searchBy=${filteredSearchedQuery}`;

  }

//   console.log(
//     apiUrl,
//     "^^^^^^^^^^^^^^^^^^This is full of The Url<<<<<<<<<<<<<<<<<<"
//   );

  return apiUrl;
};

export default FilterSortQuery;
