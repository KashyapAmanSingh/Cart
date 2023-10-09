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
          session_Id : session_id,
        });
        // console.log("Response from API:-------------------------------------------------->", response.data);
        setStates(response.data);
      } catch (error) {
        console.error("Error retrieving data:-------------------------------------------------->", error);
      }
    };
    

    fetchD();
  }, []);
 
  if(state && state.data  ) { 
    const {retrievedSession}=state.data;

    const {
      session_id: id,
      amount_subtotal,
      amount_total,
      created,
      currency,
      custom_text,
      customer_details: { email, name, phone },
      invoice,
      line_items: { object, has_more },
      metadata: {product_ids },
      mode,
      payment_intent,
      payment_method_types,
      status,
      total_details: { amount_discount, amount_shipping, amount_tax }
  } = retrievedSession;
  
  console.log("id:-------------------------------------------------->", id,session_id);
  console.log("amount_subtotal:-------------------------------------------------->", amount_subtotal);
  console.log("amount_total:-------------------------------------------------->", amount_total);
  console.log("created:-------------------------------------------------->", created);
  console.log("currency:-------------------------------------------------->", currency);
  console.log("custom_text:-------------------------------------------------->", custom_text);
  console.log("email:-------------------------------------------------->", email);
  console.log("name:-------------------------------------------------->", name);
  console.log("phone:-------------------------------------------------->", phone);
  console.log("invoice:-------------------------------------------------->", invoice);
  console.log("object:-------------------------------------------------->", object);
  console.log("has_more:-------------------------------------------------->", has_more);
  console.log("metadata:-------------------------------------------------->", product_ids);
  console.log("mode:-------------------------------------------------->", mode);
  console.log("payment_intent:-------------------------------------------------->", payment_intent);
  console.log("payment_method_types:-------------------------------------------------->", payment_method_types[0]);
  console.log("status:-------------------------------------------------->", status);
  console.log("amount_discount:-------------------------------------------------->", amount_discount);
  console.log("amount_shipping:-------------------------------------------------->", amount_shipping);
  console.log("amount_tax:-------------------------------------------------->", amount_tax);
  


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
