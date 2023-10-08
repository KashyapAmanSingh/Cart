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
  const [state, setState] = useState();
  
  console.log(
    state.data.retrievedSession.id,
    "<<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>>>____________________________________"
  );

  useEffect(() => {
    const fetchD = async () => {
      try {
        const response = await axios.post(`/api/retrieveSession`, {
          id: session_id,
        });

        setState(response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchD();
  }, []);

  const redirectToHome = () => {
    console.log("Redirecting to Home Page");
    router.push("/");
  };

  return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session_id}</p>
      <button
        className="btn btn-danger"
        id="continueShoppingButton"
        onClick={redirectToHome}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default SuccessPage;

// source: "/api/.*",
