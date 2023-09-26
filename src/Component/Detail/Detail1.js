/* eslint-disable @next/next/no-img-element */

import CheckoutButton from "@/Compo/checkoutform";
import { addItem } from "@/redux/Slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalOffer  } from 'react-icons/md';
 





const Detail1 = ({ id }) => {
  const cartItems = useSelector((state) => state.Product.items);
  const dispatch = useDispatch();
  const filteredItems = cartItems.filter((item) => item._id === id.slug);
  const [item] = filteredItems;

  if (!item) {
    return <p>No product data available. Product not found.</p>;
  }

  const {
    price,
    brand,
    category,
    description,
    seller,
    size,
    title,
    images,
    offers,
    ratings,
    is_featured,
    stock,
    discount,
    tags,
  } = item;

  const handleAddToCart = (product) => {
    dispatch(
      addItem({
        id: product._id,
        title: product.title,
        image: product.images[0],
        price: product.price,
      })
    );
  };

  return (
    <div>
      <div>
        {/* <!-- Main Product --> */}
        {/* container-fluid */}
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2 mt-5 mb-5 ">
              <div className="vice_image1  border-3 border-warning border">
                <img src={images[1]} alt={title} class="img-fluid" />
              </div>

              <div className="vice_image1 mt-2  border-3 border-warning border">
                <img src={images[2]} alt={title} class="img-fluid" />
              </div>
            </div>

            <div class="col-md-4 border-3 border-warning border mt-4 ">
              <img src={images[0]} alt={title} class="img-fluid" />
            </div>
            <div class="col-md-6 mt-5">
              {/* <!-- Product Details --> */}
              <h4 class="title mt-3 mb-3 text-left fw-bold">{title}</h4>
              <div class="d-flex align-items-center">
                <div class="rating">
                  {/* <!-- Insert star rating here --> */}
                </div>
                <span class="text-muted mx-1 mb-2 btn btn-warning">154 orders</span>
                <span class="text-dark mx-4 mb-2 btn btn-info">In stock:{stock}</span>
              </div>
              <div class="price mb-3 mt-3">
                <span class="h4 mb-3 fw-medium"><MdOutlineLocalOffer />Price:&#8377;{price}</span>
                <span class=" h4 text-muted  mx-4">Discount:{discount}%</span>
                {/* <span class="text-muted">Assured:{tags}</span> */}
              </div>
              {/* <p>{description.slice(0, 190)}</p> */}
              {/* <!-- Specifications --> */}
              <table className="table table-bordered mt-4  mb-3">
                <tbody>
                  <tr className="active">
                    <th className="py-2">Brand: </th>
                    <td className="py-2"> {brand}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Category: </th>
                    <td className="py-2"> {category}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Seller::</th>
                    <td className="py-2"> {seller}</td>
                  </tr>
                  <tr className="info">
                    <th className="py-2">Size:</th>
                    <td className="py-2">{size}</td>
                  </tr>
                </tbody>
              </table>

              <div class="d-flex mb-4 my-4 ">
                <div class="">
                  <CheckoutButton />
                </div>
                <button
  className="btn btn-info btn-md mx-5 mb-4"
  onClick={() => handleAddToCart(item)}
>
  Add to Cart
</button>

              </div>
            </div>
          </div>
        </div>

        {/* <div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 1" class="img-fluid" />
    </div>
    <div class="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 2" class="img-fluid" />
    </div>
    <div class="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 3" class="img-fluid" />
    </div>
  </div>
</div> */}
      </div>
    </div>
  );
};

export default Detail1;
