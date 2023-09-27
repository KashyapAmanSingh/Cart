/** @type {import('next').NextConfig} */
// 
 
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  
};

  
// module.exports = {
  //   async headers() {
  //     return [
  //       {
  //         source: "/api/:path*",
  //         headers: [
  //           { key: "Access-Control-Allow-Credentials", value: "true" },
  //           { key: "Access-Control-Allow-Origin", value: "*" },
  //           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
  //           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //         ]
  //       }
  //     ]
  //   },

  // module.exports = {
  //   images: {
  //     domains: ['res.cloudinary.com'],
  //     loader: 'cloudinary', // This should be set to 'cloudinary' if you are using Cloudinary as the image loader.
  //     path: 'https://res.cloudinary.com/dm2wuzfzc/image/upload', // Note the corrected path.
  //   },
  // };