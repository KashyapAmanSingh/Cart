import React from "react";
import Image from "next/image";
import logInFirst from "../../../public/images/logInFirst.jpg";

const LoginFirst = () => {
  return (
    <>
      <p className="fw-bold text-center text-muted fs-1 mt-5 mb-1 pt-3 mb-0">
        Please First sign in or register to get access!
      </p>
      <div className="  ">
        <Image
          src={logInFirst}
          height={450}
          width={600}
          className="p-0  border border-2 border-muted  rounded mx-auto d-block"
          alt="please sign in first to access profile page"
        />
      </div>
    </>
  );
};

export default LoginFirst;
