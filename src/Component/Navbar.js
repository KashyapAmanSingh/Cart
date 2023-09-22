import React from 'react';
import Link from 'next/link';
import CartCount from './cartCount';
import Filter from './Filter/Sorting';
import Searching from './Filter/Searching';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-white fw-bolder">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/cart"
                className="nav-link active text-white fw-bolder d-flex align-items-center"
                aria-current="page"
              >
                <span className="ms-1">Cart</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/Sorting"
                className="nav-link active text-white fw-bolder d-flex align-items-center"
                aria-current="page"
              >
                <span className="ms-1">Sorting</span>
              </Link>
            </li>




       




          </ul>
          {/* <form className="d-flex px-4" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
            >
              Search
            </button>
          </form> */}

                   <Searching/>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0 px-4">
            <li className="nav-item">
              <Link
                href="/cart"
                className="nav-link active text-white fw-bolder d-flex align-items-center"
                aria-current="page"
              >
                <span className="ms-1">Cart</span>
                <CartCount />
              </Link>
              
              </li>
          </ul>
        
            <li className="nav-item">
               {/* <Filter/> */}
             </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
