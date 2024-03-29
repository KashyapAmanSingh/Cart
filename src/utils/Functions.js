import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { homeItem } from "@/redux/ProductSlice";
import { fetchData } from "@/utils/FetchCode";
import { addItem } from "@/redux/Slice";
import FilterSortQuery from "@/Component/Filter/FilterSortQuery";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WishList from "@/Component/WishList/WishList";

const Functions = () => {
  const dispatch = useDispatch();
  const apiUrl = FilterSortQuery();
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetchData(apiUrl);
      console.log(
        response,
        "<---------  !!!!!!!!! Response from the FetchProducts API!!!"
      );
      console.log(
        apiUrl,
        "!!!!!!!!! Response from the FetchProducts API apiUrl name is last at apiUrl!!!"
      );
      if (response) {
        const { products } = response.data;
        dispatch(homeItem(products));
        setLoading(false);
        // Data fetching was successful, no need to return loading
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Data fetching failed, no need to return loading
    }
  }, [apiUrl, dispatch]);

  return {
    fetchProducts,
    apiUrl,
    loading,
  };
};

export default Functions;

const HandleAddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  const image =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.firstImage;

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product._id,
        title: product.title,
        image: image,
        price: product.price,
      })
    );
  };

  return (
    <div>
      <button className="btn btn-info mt-1  " onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const HandleCartImage = ({ src, alt, id  }) => {
  const router = useRouter();
  const goToCardDetailsPage = (id) => {
    if (router) {
      router.push(`/CardDetails/${id}`);
    } else {
      console.error("Router is not available.");
    }
  };

  return (
    <div
      className="mx-auto mb-0   "
      style={{ width: "10rem", height: "7rem", position: "relative" }}
    >
      <Image
        src={src}
        layout="fill"
        className="card-img-top"
        alt={`Image of ${alt}`}
        onClick={() => goToCardDetailsPage(id)}
      />
    </div>
  );
};

export { HandleCartImage };

export { HandleAddToCartBtn };
