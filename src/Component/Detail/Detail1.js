/* eslint-disable @next/next/no-img-element */

import CheckoutButton from "@/Compo/checkoutform";
import { addItem } from "@/redux/Slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLocalOffer } from "react-icons/md";

const Detail1 = () => {
  const cartItems = useSelector((state) => state.Product.items);
console.log(cartItems);//                         *This is empty  on each refresh 
  const Id = useSelector((state) => state.Reviews.ProductOrderId);
  const dispatch = useDispatch();
  const filteredItems = cartItems.filter((item) => item._id === Id);
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 mt-5 mb-5 ">
              <div className="vice_image1  border-3 border-warning border">
                <img src={images[1]} alt={title} className="img-fluid" />
              </div>

              <div className="vice_image1 mt-2  border-3 border-warning border">
                <img src={images[2]} alt={title} className="img-fluid" />
              </div>
            </div>

            <div className="col-md-4 border-3 border-warning border mt-4 ">
              <img src={images[0]} alt={title} className="img-fluid" />
            </div>
            <div className="col-md-6 mt-5">
              {/* <!-- Product Details --> */}
              <h4 className="title mt-3 mb-3 text-left fw-bold">{title}</h4>
              <div className="d-flex align-items-center">
                <div className="rating">
                  {/* <!-- Insert star rating here --> */}
                </div>
                <span className="text-muted mx-1 mb-2 btn btn-warning">
                  154 orders
                </span>
                <span className="text-dark mx-4 mb-2 btn btn-info">
                  In stock:{stock}
                </span>
              </div>
              <div className="price mb-3 mt-3">
                <span className="h4 mb-3 fw-medium">
                  <MdOutlineLocalOffer />
                  Price:&#8377;{price}
                </span>
                <span className=" h4 text-muted  mx-4">
                  Discount:{discount}%
                </span>
                {/* <span className="text-muted">Assured:{tags}</span> */}
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

              <div className="d-flex mb-4 my-4 ">
                <div className="">
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

        {/* <div className="container mt-5">
  <div className="row">
    <div className="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 1" className="img-fluid" />
    </div>
    <div className="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 2" className="img-fluid" />
    </div>
    <div className="col-md-4">
       <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp" alt="Product Image 3" className="img-fluid" />
    </div>
  </div>
</div> */}
      </div>
    </div>
  );
};

export default Detail1;
