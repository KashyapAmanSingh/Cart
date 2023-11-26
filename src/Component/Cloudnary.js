"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import cloudinary from "cloudinary-core";
import { FcUpload } from "react-icons/fc";
import Loader from "./Progress";
import Image from "next/image";

const cloudinaryCore = new cloudinary.Cloudinary({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});
function ImageUpload({ setOptimisedImageUrl, OptimisedImageUrl }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState("");

  const handleFileSelect = (e) => {
    const files = e.target.files[0];
    setSelectedFiles(files);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

 
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL, formData);
 
        if (response.status === 200) {
          const { secure_url } = response.data;
          const optimizedImageUrl = cloudinaryCore.url(secure_url, {
            width: 500,
            crop: "fill",
            quality: "auto",
            fetch_format: "auto",
          });
 

          setOptimisedImageUrl(optimizedImageUrl);
          setIsLoading(false);
        } else {
          console.error("Image upload failed", response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Image upload error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div className="ImageUploadBox">
      {OptimisedImageUrl === "" ? (
        <div>
          <label
            htmlFor="image_input"
            id="file-upload-btn"
            className="bg-dark text-light  rounded-2 "
          >
            {isLoading ? (
              <div className="text-center">
                <Loader />
              </div>
            ) : (
              <>
                <FcUpload size={55} /> Upload Images
              </>
            )}
          </label>

          <input
            type="file"
            name="image"
            id="image_input"
            accept=".jpg, .jpeg, .png"
            single
            onChange={handleFileSelect}
          />
          <button
            type="button"
            className="btn btn-info mx-3 mb-1"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>
        </div>
      ) : (
        <div className="border border-2 border-dark">
          <Image
            src={OptimisedImageUrl}
            width={170}
            height={170}
            quality={100}
            alt="profile uploads"
          />
        </div>
      )}
    </div>
  );
}

export default React.memo(ImageUpload);
