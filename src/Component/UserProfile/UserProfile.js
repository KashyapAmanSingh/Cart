import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import { useSelector } from "react-redux";

const BuyedItem = dynamic(() => import("./BuyedItem"), {
  suspense: true,
});

const UserProfile = () => {
  const { given_name, family_name, mobileNumber, email, profilePicture } =
    useSelector((state) => state.user.user);

  const fieldNamesMapping = {
    Name: given_name,
    Lastname: family_name,
    PhoneNumber: mobileNumber,
    Email: email,
    City: "Teghra",
    State: "Bihar",
    Pincode: 851137,
    Country: "India",
    Currency: "INR",
  };
  const entries = Object.entries(fieldNamesMapping);

  return (
    <div className="container mt-5">
      <div className="row  mx-5">
        <div className="col-sm-3 mb-4">
          <div className="card card-style1 my-2 mt-5 border-0">
            <div className="card-body  d-flex justify-content-center p-1-9 p-sm-2-3 p-md-6 p-lg-7">
              <Image
                className="rounded-circle img-fluid h-100 w-100 mt-5 mb-2"
                src={profilePicture}
                alt="No Profile Picture available"
                width={900}
                height={900}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-4 px-xl-10 d-flex justify-content-center">
          <div className="card card-style1 border-0">
            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
              {entries.map(([key, value], index) => (
                <div key={index}>
                  <p className="my-3 fw-bolder">{`${key}: ${value}`}</p>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-sm-4 text-center px-xl-10">
          <div className="col-sm-12">
            <h3 className="mt-4 mx-1">Products You Bought</h3>

            <Suspense fallback={<div>Loading Buyed Items...</div>}>
              <BuyedItem />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
