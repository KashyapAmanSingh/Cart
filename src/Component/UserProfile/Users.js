"use client";
import { fetchData } from "@/utils/FetchCode";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";

// Import the dynamic component for ImageUpload with suspense
const ImageUpload = dynamic(() => import("../Cloudnary"), {
  suspense: true,
});

function UserForm() {
  // Initialize the useRouter hook
  const route = useRouter();

  // State to hold the optimised image URL
  const [OptimisedImageUrl, setOptimisedImageUrl] = useState("");

  // Initial form data
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

  // State to hold form data
  const [formData, setFormData] = useState(initialFormData);

  // Array of field names
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

  // Function to handle changes in form fields
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

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the fetchData function to make a POST request
      const response = await fetchData("/api/user", "POST", formData);
      console.log("Review submitted successfully", response);
    } catch (error) {
      console.error("Error submitting review", error);
    }

    // Redirect to the home page after submission
    route.push("/");
  };

  // JSX structure for the component
  return (
    <>
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          {fieldNames.map((fieldName) => (
            <div key={fieldName} className="row mb-3">
              <label className="col-sm-6 col-form-label fw-bolder">
                {fieldName === "mobileNumber"
                  ? "Mobile Number"
                  : `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(
                      1
                    )}:`}
                {/* fieldName.slice(1) append rest all character start from index 1st  */}
              </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          ))}
          <div className=" d-flex justify-content-start">
            <Suspense fallback={<div>Loading ImageUpload ...</div>}>
              {/* Render the ImageUpload component with suspense */}
              <ImageUpload
                setOptimisedImageUrl={setOptimisedImageUrl}
                OptimisedImageUrl={OptimisedImageUrl}
              />
            </Suspense>
          </div>

          <div className=" d-flex justify-content-center  mb-5">
            <button type="submit" className="btn btn-warning">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserForm;

// "use client";
// import { fetchData } from "@/utils/FetchCode";
//  import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import React, { Suspense, useState } from "react";
// const ImageUpload = dynamic(() => import("../Cloudnary"), {
//   suspense: true,
// });

// function UserForm() {
//   const route = useRouter();
//   const [OptimisedImageUrl, setOptimisedImageUrl] = useState("");

//   const initialFormData = {
//     name: "",
//     mobileNumber: "",
//     email: "",
//     profilePicture: OptimisedImageUrl,
//     address: {
//       street: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       country: "",
//     },
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const fieldNames = [
//     "name",
//     "mobileNumber",
//     "email",
//     "address.street",
//     "address.city",
//     "address.state",
//     "address.postalCode",
//     "address.country",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // For nested fields (address), update the state accordingly
//     if (name.startsWith("address.")) {
//       const addressField = name.split(".")[1];
//       setFormData((prevData) => ({
//         ...prevData,
//         address: {
//           ...prevData.address,
//           [addressField]: value,
//         },
//         profilePicture: OptimisedImageUrl,
//       }));
//     } else {
//       // For non-nested fields, update the state normally
//       setFormData({
//         ...formData,
//         profilePicture: OptimisedImageUrl,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetchData("/api/user", "POST", formData);

//       console.log("Review submitted successfully", response);
//     } catch (error) {
//       console.error("Error submitting review", error);
//     }
//     route.push("/");
//   };

//   return (
//     <>
//       <Suspense fallback={<div>Loading ImageUpload ...</div>}>
//         <ImageUpload
//           setOptimisedImageUrl={setOptimisedImageUrl}
//           OptimisedImageUrl={OptimisedImageUrl}
//         />
//       </Suspense>

//       <form onSubmit={handleSubmit}>
//         {fieldNames.map((fieldName) => (
//           <div key={fieldName}>
//             <label>
//               {fieldName === "mobileNumber" ? "Mobile Number" : fieldName}:
//             </label>
//             <input
//               type="text"
//               name={fieldName}
//               value={formData[fieldName]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default UserForm;
