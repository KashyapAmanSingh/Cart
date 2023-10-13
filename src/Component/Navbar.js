import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcBusinessman } from "react-icons/fc";
import LogOut from "./UserProfile/LogOut";
import {  FcBookmark } from 'react-icons/fc';
const Searching = dynamic(() => import("./Filter/Searching"));
const Sorting = dynamic(() => import("./Filter/Sorting"));
const CartCount = dynamic(() => import("./CartComponent/cartCount"));
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
                href="/UsersProfiles"
                className="nav-link active text-white fw-bolder d-flex align-items-center"
                aria-current="page"
              >
                <span className="ms-1">
                  <FcBusinessman size={35} />
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/WishList"
                className="nav-link active text-white fw-bolder d-flex align-items-center"
                aria-current="page"
              >
                <span className="ms-1">
                  <FcBookmark size={35} />
                </span>
              </Link>
            </li>
          </ul>

          <Searching />
          <Sorting />

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
          <div className="btn btn-link bg-light  ">
            <LogOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
