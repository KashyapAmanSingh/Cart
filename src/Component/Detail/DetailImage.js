import Image from "next/image";
import React from "react";

const DetailImage = (image  ) => {
    console.log("DetailImage------------------",title)
  return (
    <>
          <div className="col-sm-4 mt-5  col-md-1 p-0 mb-5 border border-1 border-info">
          {/* First Child Column (col-sm-12) */}
          <div
            className="vice_image1 mt-5 border-1 border-secondary border"
            style={{ height: "5rem", width: "5rem", position: "relative" }}
          >
            <Image layout="fill" objectFit="cover" src={image[2]} alt={"sfasdfasfs"} />
          </div>

          {/* Second Child Column (col-sm-6) */}
          <div
            className="vice_image1 mt-2 border-1 border-secondary border"
            style={{ height: "5rem", width: "5rem", position: "relative" }}
          >
            <Image layout="fill" objectFit="cover" src={image[1]} alt={ "sfasdfasfs"} />
          </div>
        </div>

         <div className="responsive-image-container col-sm-7">
          <Image
            layout="responsive"
            objectFit="cover"
            src={image[3]}
            height={100}
            width={118}
            alt={"sfasdfasfs"}
          />
        </div>
        </>
  );
};

export default DetailImage;
