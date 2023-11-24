"use client"
import Sorting from "@/Component/Filter/Sorting";
import React, { useEffect } from "react";

const SortOffCanvas = () => {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.min.js");
        import("bootstrap/dist/css/bootstrap.min.css") ;
      }, []);
  return (
    <div>
      <button
        className="btn btn-dark p-0 "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
       Sort
      </button>

      <div
        className="offcanvas offcanvas-bottom border border-3 border-dark  rounded-1"
        tabindex="-1"
        style={{height:"8rem"}}
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title border border-1 border-dark  my-auto mx-auto rounded-1" id="offcanvasBottomLabel">
          <Sorting />
          </h5>
          <button
            type="button"
            className="btn-close text-reset border border-3 border-dark"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
       </div>
    </div>
  );
};

export default SortOffCanvas;
