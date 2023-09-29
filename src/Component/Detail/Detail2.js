/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function DynamicTabs( ) {
  const router = useRouter();
  const cartItems = useSelector((state) => state.Product.items); //If i refresh CartItems Empty 
  console.log(cartItems,"==============>>DynamicTabs CartItems<<<================");
  const Id = useSelector((state) => state.Reviews.ProductOrderId);
     const filteredItems = cartItems.filter((item) => item._id === Id);
 console.log("This is the first id of detailed Dynamic Id ??",Id)
  const filteredSimilar = cartItems.filter(
    (item) =>
      item.category === filteredItems[0].category &&
      item.title !== filteredItems[0].title
  );

  const [item] = filteredItems;
  if (!item) {
    return <p>No product data available. Product not found.</p>;
  }

  const {
    title,
    model,
    subcategory,
    description,
    legalDisclaimer,
    manufacturingInfo,
  } = item;
  const goToCardDetailsPage = (id) => {
    console.log("id of the similar Products<<======================>>",id);
    router.push(`/CardDetails/${id}`);
  };

  return (
    <div className="container-fluid mb-5 mt-5">
      <div className="row gx-4">
        <div className="col-lg-8 mb-4">
          <div className="border rounded-2 px-3 py-2 bg-white">
            <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <li className="nav-item d-flex" role="presentation">
                <a
                  className="nav-link d-flex align-items-center justify-content-center w-100 active"
                  id="ex1-tab-1"
                  data-mdb-toggle="pill"
                  href=" "
                  role="tab"
                  aria-controls="ex1-pills-1"
                  aria-selected="true"
                >
                  Specification
                </a>
              </li>
            </ul>

            <div className="tab-content" id="ex1-content">
              <div
                className="tab-pane fade show active"
                id="ex1-pills-1"
                role="tabpanel"
                aria-labelledby="ex1-tab-1"
              >
                <div>
                  <h6>
                    <strong>Title: </strong>
                  </h6>
                  <p>{title}</p>
                  <table className="table table-bordered mt-3 mb-5">
                    <tbody>
                      <tr className="active">
                        <th className="py-2">Model: </th>
                        <td className="py-2">{model}</td>
                      </tr>
                      <tr className="info">
                        <th className="py-2">Subcategory:</th>
                        <td className="py-2">{subcategory}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>
                    <strong>Descriptions: </strong>
                  </h6>
                  <p>{description}</p>
                  <h6>
                    <strong>Legal Disclaimer: </strong>
                  </h6>
                  <p>{legalDisclaimer}</p>
                  <h6>
                    <strong>Manufacturing Info: </strong>
                  </h6>
                  <p>{manufacturingInfo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4 border-5 border-info border">
          <h1>Similar Others Products</h1>
          <div className="row">
            {filteredSimilar.slice(0, 2).map((item) => (
              <div key={item._id} className="col-md-6" 
              onClick={() => goToCardDetailsPage(item._id)}

               >
                <div className="card mb-4">
                  {/* Add your card content here */}
                  <img
                    src={item.images[0]}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="h6 m-0 card-title text-align-center">
                      {item.title}
                    </h5>
                    <p className="card-text">Price: ₹{item.price}</p>
                    <button
                      className="btn btn-info"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTabs;
