"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
  import cloudinary from 'cloudinary-core';
  import { FcUpload } from "react-icons/fc";
import Loader from "./Progress";
// import PropTypes from "prop-types";
 
const cloudinaryCore = new cloudinary.Cloudinary({ cloud_name: "dm2wuzfzc" });

function ImageUpload({ setOptimisedImageUrl, OptimisedImageUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState("");
console.log(selectedFiles,"-----------------------------------------------------This is Selected Files from The Profile Pictures%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  const handleFileSelect = (e) => {
    const files = e.target.files[0];
    setSelectedFiles( files );
  };

  const handleImageUpload = async () => {
    setIsLoading(true);
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles);

      // selectedFiles.forEach((file) => {
      //   formData.append("file", file);
      // });
      formData.append("upload_preset", "bofedne7");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dm2wuzfzc/image/upload",
          formData
        );

        if (response.status === 200) {
          const { secure_url } = response.data;
          const optimizedImageUrl = cloudinaryCore.url(secure_url, {
            width: 500,
            crop: "fill",
            quality: "auto",
            fetch_format: "auto",
          });

          setOptimisedImageUrl(  optimizedImageUrl );
          setIsLoading(false);
        } else {
          console.error("Image upload failed");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Image upload error:", error);
        setIsLoading(false);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <label
        htmlFor="image_input"
        id="file-upload-btn"
        className="d-flex justify-content-center align-items-center"
      >
        {isLoading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : (
          <>
            <FcUpload size={24} /> Upload Images
          </>
        )}
      </label>
      <input
        type="file"
        name="image"
        id="image_input"
        accept=".jpg, .jpeg, .png"
        multiple
        onChange={handleFileSelect}
      />

      <button
        type="button"
        className="btn btn-info"
        onClick={handleImageUpload}
      >
        Upload Image
      </button>

      {/* {OptimisedImageUrl.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          {OptimisedImageUrl.map((url, index) => (
            <div key={index}>
              <img src={url} alt={`Uploaded ${index}`} />
              <p>This is the final URL: {url}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
// ImageUpload.propTypes = {
//   setOptimisedImageUrl: PropTypes.func.isRequired,
//   OptimisedImageUrl: PropTypes.array.isRequired,
// };

export default ImageUpload;
