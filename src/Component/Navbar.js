import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FcBusinessman } from "react-icons/fc";
import LogOut from "./UserProfile/LogOut";
import {
  FcAlphabeticalSortingAz,
  FcBookmark,
  FcFilledFilter,
} from "react-icons/fc";
import { FaFilter } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
 
import OffCanvaSideBar from "@/app/SideBarCanvas/OffCanvaSideBar";
import SortOffCanvas from "@/app/SideBarCanvas/SortOffCanvas";
const Searching = dynamic(() => import("./Filter/Searching"));
const Sorting = dynamic(() => import("./Filter/Sorting"));
const CartCount = dynamic(() => import("./CartComponent/cartCount"));
const Navbar = () => {
  return (
    <nav className=" navbar fixed-top  navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand text-white fw-bolder mx-1">
          Home
        </Link>
        <div className="border border-1 border-secondary p-1 d-sm-inline d-md-none d-lg-none d-xl-none d-xxl-none  ">
          <OffCanvaSideBar />
        </div>

        <div className="border p-1 d-flex border-1 border-secondary    d-sm-inline  d-md-inline  d-lg-none d-xl-none d-xxl-none  ">
          <SortOffCanvas />
        </div>
        <div className="CartNavbr d-sm-inline d-md-inline d-lg-none d-xl-none d-xxl-none">
          <Link
            href="/cart"
            className="nav-link active text-white fw-bolder d-flex align-items-center"
            aria-current="page"
          >
            <span className="ms-1 d-none  d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none">
              Cart
            </span>
            <CartCount />
          </Link>
        </div>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "> </span>
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
          </ul>

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
          <div className="btn btn-link bg-light  ">
            <LogOut />
          </div>
        </div>
      </div>
      <div className="d-none mx-5  d-sm-none d-md-none d-lg-inline d-xl-inline d-xxl-inline  ">
        <Sorting />
      </div>
      <Searching />
    </nav>
  );
};

export default Navbar;
