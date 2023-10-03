"use client";
import { fetchData } from "@/utils/FetchCode";
 import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
const ImageUpload = dynamic(() => import("../Cloudnary"), {
  suspense: true,
});

function UserForm() {
  const route = useRouter();
  const [OptimisedImageUrl, setOptimisedImageUrl] = useState("");

  const initialFormData = {
    name: "",
    mobileNumber: "",
    email: "",
    profilePicture: OptimisedImageUrl,
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const fieldNames = [
    "name",
    "mobileNumber",
    "email",
    "address.street",
    "address.city",
    "address.state",
    "address.postalCode",
    "address.country",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For nested fields (address), update the state accordingly
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
        profilePicture: OptimisedImageUrl,
      }));
    } else {
      // For non-nested fields, update the state normally
      setFormData({
        ...formData,
        profilePicture: OptimisedImageUrl,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData("/api/user", "POST", formData);
       
      console.log("Review submitted successfully", response);
    } catch (error) {
      console.error("Error submitting review", error);
    }
    route.push("/");
  };
  
 
  return (
    <>
      <Suspense fallback={<div>Loading ImageUpload ...</div>}>
        <ImageUpload
          setOptimisedImageUrl={setOptimisedImageUrl}
          OptimisedImageUrl={OptimisedImageUrl}
        />
      </Suspense>

      <form onSubmit={handleSubmit}>
        {fieldNames.map((fieldName) => (
          <div key={fieldName}>
            <label>
              {fieldName === "mobileNumber" ? "Mobile Number" : fieldName}:
            </label>
            <input
              type="text"
              name={fieldName}
              value={formData[fieldName]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UserForm;
