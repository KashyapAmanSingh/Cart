// http://localhost:3000/StripeSuccess?session_id=cs_test_b1qSsxX34jhdYKblUp2UHpveepfMJ4KEekvPVAy10DHztrmQurJq0FBVoX

"use client";
import { fetchData } from "@/utils/FetchCode";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SuccessPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");
  const [state, setStates] = useState({});

  useEffect(() => {
    const fetchD = async () => {
      try {
        const response = await axios.post(`/api/retrieveSession`, {
          id: session_id,
        });
        // console.log(response);
        setStates(response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchD();
  }, []);

  // if (state && Object.keys(state).length > 0) {
  //   console.log(
  //     state.data,
  //     "<<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>>>____________________________________"
  //   );
  
  //   if (state.data && state.data) {
  //     for (const key in state.data) {
  //       if (state.data.hasOwnProperty(key)) {
  //         const value = state.data[key];
  //         console.log(`${key}:`, value);
  //         // You can do something with key and value here
  //       }
  //     }
  //   } else {
  //     console.log("retrieveSession is undefined");
  // }
  

  

  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session_id}</p>
      <button
        className="btn btn-danger"
        id="continueShoppingButton"
        // onClick={redirectToHome}
      >
        Continue Shopping
      </button>
    </div>
  );
};
}
export default SuccessPage;

// source: "/api/.*",
