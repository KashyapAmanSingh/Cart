"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserForm() {
  const route = useRouter();

  const initialFormData = {
    name: "",
    mobileNumber: "",
    email: "",
    profilePicture: "",
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
    "profilePicture",
    "address.street",
    "address.city",
    "address.state",
    "address.postalCode",
    "address.country",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user", formData);

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
    // route.push('/')
  };

  return (
    <>
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
