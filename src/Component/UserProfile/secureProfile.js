import React from "react";
import Image from "next/image";
import profile_details from "../../../public/images/profile_details.svg";

export default function SecureProfile() {
  return (
    <div className="">
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 mt-5 my-3 mb-0  d-flex flex-column justify-content-center align-items-center vh-80">
        
            <p className="text-center mb-5 text-muted text-dark fs-3 m-0 fw-medium">
              Before exploring your{" "}
              <span className="text-primary fw-bold">profile</span>, please{" "}
              <span className="text-primary fw-bold">
                log in first so that you
              </span>{" "}
              access your profile{" "}
              <span className="text-primary fw-bold">good luck & stay fit </span>
            </p>

            <Image
              priority
              src={profile_details}
              height={350}
              width={490}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
