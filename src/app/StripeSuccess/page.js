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
        // console.log("Response from API:", response.data);
        setStates(response.data);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    

    fetchD();
  }, []);
 
  if(state && state.data  ) { 
    const {retrievedSession}=state.data;

//     const {
//        session_id: id,
//        amount_subtotal: 1479700
// ​
// amount_total: 1751046
// created: 1696751338
// ​
// currency: "inr"

// custom_text  
      
// customer_details: Object { email: "coder85113@gmail.com", name: "coder Aman Kashyap", phone: "+917992265306", … }
      
// invoice: "in_1NywMeSGcFt4Msz1Y3q8U7vK"
      

// line_items: Object { object: "list", has_more: false, 
      
// metadata: Object {  }
// ​
// mode: "payment"
      
      
// payment_intent: "pi_3NywMYSGcFt4Msz11Fd4Jbkv"
      
// payment_method_types: Array [ "card" ]
      
// status: "complete"
      
      
// total_details: Object { amount_discount: 0, amount_shipping: 5000, amount_tax: 266346 }
// ​​
// amount_discount: 0
// ​​
// amount_shipping: 5000
// ​​
// amount_tax: 266346
      
 
//     }=retrievedSession;



  console.log("THIS IS STATE OD THE PAGE SUCCESS",retrievedSession);
}
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
// }
export default SuccessPage;

// source: "/api/.*",
