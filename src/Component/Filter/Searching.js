"use client"
import axios from 'axios';
import React, { useState } from 'react';

const Searching = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [  searchData,   setSearchData] = useState('');

console.log(searchTerm,"========>>>>>>>>searchTerm<<<<<<<<<<<=========")
console.log(searchData,"========>>>>>>>>-----------------searchData--------------------<<<<<<<<<<<=========")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get(`/api/fetchProduct?searchBy=${searchTerm}` );
 
    if (response.status === 200) {
        try {
          const data = await response.data;
          console.log('Search results:', data);
          setSearchData(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Request failed with status:', response.status);
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="d-flex px-4" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-outline-success"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default  Searching;











