/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const redirectToHome = () => {
    console.log("Redirecting to Home Page");
    // window.location.href = "/";
    router.push("/");
  };
  return (
    <div>
      <h1>Payment Failed</h1>
      <p>
        Sorry, there was an issue processing your payment. Please try again.
      </p>
      <button
        className="btn btn-danger"
        id="continueShoppingButton"
        onClick={redirectToHome}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Page;
