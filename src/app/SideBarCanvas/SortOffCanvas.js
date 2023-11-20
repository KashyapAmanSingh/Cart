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
        class="btn btn-dark p-0 "
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasBottom"
        aria-controls="offcanvasBottom"
      >
       Sort
      </button>

      <div
        class="offcanvas offcanvas-bottom"
        tabindex="-1"
        id="offcanvasBottom"
        aria-labelledby="offcanvasBottomLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasBottomLabel">
          <Sorting />

          </h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body small">...</div>
      </div>
    </div>
  );
};

export default SortOffCanvas;
