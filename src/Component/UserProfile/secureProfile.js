import React from "react";
import Image from "next/image";
import profile_details from "../../../public/images/profile_details.svg";

export default function SecureProfile() {
  return (
    <div className="">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12  my-3 mb-0 mt-0 d-flex flex-column justify-content-center align-items-center vh-80">
            <h1 className="mt-5 mb-2 text-dark mb-3 text-center fw-bold fs-2 text-info">
              Welcome, Fitness Wizard! Welcome to the Fitness Wizard!
            </h1>
            <p className="text-center mb-5 text-muted text-dark fs-4 m-0 fw-medium">
              Before exploring your{" "}
              <span className="text-primary fw-bold">profile</span>, please{" "}
              <span className="text-primary fw-bold">
                log in first so that you
              </span>{" "}
              access your profile{" "}
              <span className="text-info fw-bold">good luck & stay fit </span>
            </p>

            <Image
              priority
              src={profile_details}
              height={540}
              width={550}
              alt="Follow us on Twitter"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
