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
  runtimeCaching: true,
   register: true,
   //scope: '/ ',
  // sw: 'service-worker.js',
  //...
})



module.exports = withPWA({
  images: {
    domains: ['res.cloudinary.com'],
    } 
   
})