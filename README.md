# MyCarts - Gym E-commerce Application

MyCarts is an e-commerce application designed for selling gym products. It includes various features such as product categories, price range filters, a secure payment gateway, detailed product pages, a review section, and user authentication with Kinder Auth.

## Technologies Used

- **Frontend:**
  - React 18.2.0
  - Next.js 13.4.19
  - Bootstrap 5.3.2
  - React Icons 4.11.0
  - React Loader Spinner 5.4.5
  - React Rating Stars Component 2.2.0
  - React Redux 8.1.2
  - React Responsive Carousel 3.2.23
  - SWR 2.2.4

- **Backend:**
  - Node.js with Express 4.18.2
  - MongoDB with Mongoose 7.5.2
  - Kinder Auth for Next.js 1.8.21
  - Axios 1.5.0 for making HTTP requests
  - Cloudinary for image management with @cloudinary/react and @cloudinary/url-gen

- **Payment Gateway:**
  - Stripe JS 2.1.5 for handling payments

  Live Deployed Link - https://muscle-populatee-mage.vercel.app/

## Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```
   
Run Development Server:
   ```bash
npm run dev
   ```
To Start Next.js development server.



### Features
Product Categories: Browse gym products in various categories.
Price Range Filters: Filter products based on price ranges.
Secure Payment Gateway: Process payments securely using Stripe JS.
Detailed Product Pages: Explore detailed information about each product.
Review Section: Leave and view reviews for products.
User Authentication: Log in, log out, and manage profiles using Kinder Auth.
Personal Profile : After Authentication Make Your Profile By Filling Details


Backend Setup
The application uses Node.js with Express for the backend and MongoDB for the database. Ensure that you have MongoDB installed and running. Update the MongoDB connection details in the backend code.

APIs and External Services
Stripe: Sign up for a Stripe account and obtain the API keys. Set the keys in your environment variables.

Cloudinary: Sign up for a Cloudinary account and obtain the API keys. Set the keys in your environment variables.

Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.




## The Application Code Sructure





## The Ui of this Application 


### Home Page Ui:
![Home_Page](https://github.com/KashyapAmanSingh/Cart/assets/119684617/774a6b94-7ca3-414c-85f7-8d0b07f6d86e)




### Product Detail Page
![Product_Detail_Page](https://github.com/KashyapAmanSingh/Cart/assets/119684617/67e0a511-02df-4a02-8214-9f73afd32658)




## Product Section
![Product_Section](https://github.com/KashyapAmanSingh/Cart/assets/119684617/d9e58686-eef7-449d-bd6d-5e4650aef7a2)


 # Application Code Structure

```
├───public
│   └───images
└───src
    ├───app
    │   ├───api
    │   │   ├───auth
    │   │   │   └───[kindeAuth]
    │   │   ├───checkout
    │   │   ├───createOrder
    │   │   ├───fetchDetailProduct
    │   │   ├───fetchProduct
    │   │   ├───kindeSession
    │   │   ├───retrieveSession
    │   │   ├───reviews
    │   │   ├───user
    │   │   └───webhooks
    │   ├───CardDetails
    │   │   └───[slug]
    │   ├───cart
    │   ├───dashboard
    │   ├───SideBarCanvas
    │   ├───Sorting
    │   ├───StripeFail
    │   ├───StripeSuccess
    │   ├───UsersProfiles
    │   └───WishList
    ├───Compo
    ├───Component
    │   ├───CartComponent
    │   ├───Detail
    │   ├───FeaturedProduct
    │   ├───Filter
    │   ├───not_found_Product
    │   ├───ReviewsRatings
    │   ├───UserProfile
    │   └───WishList
    ├───redux
    └───utils
```











 
