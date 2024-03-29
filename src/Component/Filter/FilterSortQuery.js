 import { useSelector } from "react-redux";

const FilterSortQuery = () => {
  const {
    sortQuery,
    filteredPriceQuery,
    filteredCategoryQuery,
    filteredSearchedQuery,
    filteredAssured,
  } = useSelector((state) => state.FilterSortSlice);
 
  const queryParams = [];

  if (filteredCategoryQuery) {
    queryParams.push(`filterBy=${filteredCategoryQuery}`);
  }

  if (filteredPriceQuery && filteredPriceQuery.length === 2) {
    const [filteredPriceQuery1, filteredPriceQuery2] = filteredPriceQuery;
    queryParams.push(`filteredPriceQuery1=${filteredPriceQuery1}`);
    queryParams.push(`filteredPriceQuery2=${filteredPriceQuery2}`);
  }

  if (sortQuery) {
    queryParams.push(`sortBy=${sortQuery}`);
    console.log("Searched content from step 2   Query component", sortQuery);
  }

  if (filteredSearchedQuery) {
    queryParams.push(`searchBy=${filteredSearchedQuery}`);
  }

  if (filteredAssured) {
    queryParams.push(`AssuredBy=${filteredAssured}`);
  }

  const apiUrl = `/api/fetchProduct${
    queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
  }`;
  return apiUrl;
};

export default FilterSortQuery;
