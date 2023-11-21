"use client";
import Category from "@/Component/Filter/Category";
 
import Link from "next/link";
import React from "react";
import { useEffect } from "react";

const OffCanvaSideBar = () => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
    import("bootstrap/dist/css/bootstrap.min.css") ;
  }, []);
  return (
    <>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBothOptions"
        aria-controls="offcanvasWithBothOptions"
      >
        Filter
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Category
          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
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
