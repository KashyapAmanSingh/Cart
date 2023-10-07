/** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa');

 


// module.exports = withPWA({
//   dest: 'public',
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
//   // ... other Next.js configuration options
// });

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^http:\/\/localhost/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24, // 1 day
        },
      },
    },
    // Add more caching strategies as needed
  ],
  register: true, // Correct placement of register property
});

module.exports = withPWA({
  images: {
    domains: ['res.cloudinary.com'],
  } 
});
// 
// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//   } 
// };

// module.exports = nextConfig
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
