// http://localhost:3000/StripeSuccess?session_id=cs_test_b1qSsxX34jhdYKblUp2UHpveepfMJ4KEekvPVAy10DHztrmQurJq0FBVoX

 "use client"
import axios from "axios";
 import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const session_id = params.get("session_id");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/retrieveSession`, {
          id: session_id,
        });
        console.log("Retrieved Data:", response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };

    fetchData();
  }, []);

   const redirectToHome = () => {
    console.log("Redirecting to Home Page");
    router.push("/");
  };

   return (
    <div>
      <h1>Thank you for your payment!</h1>
      <p>Your SuccessPageID: {session}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
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


 