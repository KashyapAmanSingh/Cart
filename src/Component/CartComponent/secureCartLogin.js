import React from "react";
import Link from "next/link";
import Image from "next/image";
import secure_login from "../../../public/images/secure_login.svg";

export default function SecureCartLogin() {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12  my-3 mb-0 mt-0 d-flex flex-column justify-content-center align-items-center vh-80">
            <h1 className="mt-4 text-dark mb-3 text-center fw-bold fs-2 text-info">
              Welcome to Our Fitness Wizard Kingdom!
            </h1>
            <p className="text-center text-muted text-dark fs-4 m-0 fw-medium">
              To access your enchanted cart and explore the magic of fitness
              gear, please first{" "}
              <span className="text-primary fw-bold"> Sign_In</span> or{" "}
              <span className="text-primary fw-bold">create an account</span>. Our
              fitness enchanters are ready to guide you on your journey!
            </p>

            <Image
              priority
              src={secure_login}
              height={520}
              width={550}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
      
      </div>
    </div>
  );
}
