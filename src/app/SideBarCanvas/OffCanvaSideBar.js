"use client";
import Category from "@/Component/Filter/Category";

import Link from "next/link";
import React from "react";
import { useEffect } from "react";

const OffCanvaSideBar = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("bootstrap/dist/css/bootstrap.min.css");
  }, []);

  return (
    <>
      <button
        className="btn btn-dark p-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Filter
      </button>

      <div
        className="offcanvas offcanvas-start bg-dark text-white w-75"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Category
          </h5>
          <button
            type="button"
            className="btn-close text-reset fs-1 bg-light btn-outline-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="container-fluid">
            <Link href="/" className="navbar-brand text-dark fw-bolder">
              Home
            </Link>

            <div className=" ">
              <div className=" ">
                <Category />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffCanvaSideBar;
