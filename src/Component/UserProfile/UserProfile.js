/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FaStreetView } from "react-icons/fa";
import { FcCellPhone, FcHome, FcAddressBook } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidCity } from "react-icons/bi";
import {
  MdOutlineRealEstateAgent,
  MdOutlineLocationCity,
} from "react-icons/md";
import { TbMapPinCode } from "react-icons/tb";
import BuyedItem from "./BuyedItem";

const UserProfile = ({ data }) => {
  const { given_name, family_name, mobileNumber, email, profilePicture } = data;

  //  FcDepartment
  const initialFormIcon = [
    FcAddressBook, //name
    FcCellPhone,
    AiOutlineMail,
    FaStreetView,
    BiSolidCity,
    MdOutlineRealEstateAgent,
    //  FcHome,
    TbMapPinCode, // Assuming this is another icon you want to include, but it's not imported in your example
    MdOutlineLocationCity,
  ];

  const fieldNamesMapping = {
    Name: given_name,
    Lastname: family_name,
    PhoneNumber: mobileNumber,
    Email: email,
    City: "Teghra",
    State: "bihar",
    Pincode: 851137,
    Country: "India",
    Currency: "INR",
  };
  const entries = Object.entries(fieldNamesMapping);

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-sm-3 mb-4  mb-lg-0">
            <div className="card card-style1 my-2 mt-5 border-0">
              <div className="card-body d-flex justify-content-center  p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <img
                  className="rounded-circle img-fluid h-100 w-100 my-5"
                  src={profilePicture}
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div className="col-sm-4 px-xl-10 d-flex justify-content-center">
            <div className="  card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                {entries.map(([key, value], index) => (
                  <div key={index}>
                    <div>{initialFormIcon[index]}</div>
                    <p className="my-3 fw-bolder">{`${key}: ${value}`}</p>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-sm-4 text-center px-xl-10    ">   
         
          <div className="col-sm-12     ">
          <div >
            <h3 className="mt-4 mx-1">Product That You Buyed</h3>

            </div>
          <BuyedItem/>       
          </div> 
 
  </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
