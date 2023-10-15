import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import AdminOrder from "../../../../models/AdminOrderInfo";
import mongoose from "mongoose";
import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
 import User from "../../../../models/User";
import axios from "axios";
 
// const endpointSecret =
//   "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9";
const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
  // { apiVersion: "2023-08-16" }
);
console.log("~11111111111111111111111111111111111111111111111~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

export async function POST(req, res) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  const parsedBody = JSON.parse(rawBody);
  // const eventType = parsedBody.type;
 
  // let event;
 
~


console.log("~~~~~~~22222222222222222222222222222222222222222222222~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")


  try {
    await ConnectionMongoosedbs();
  

    const response = await axios.post('http://localhost:3000/api/createOrder',   rawBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });  
      const data = response.data;
 
 
    
    // if (newOrder) {
    //   await User.findByIdAndUpdate(userId, {
    //     $push: { orders: newOrder._id },
    //   });
    // }
    
 
    // event = await stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

    // switch (eventType) {
    //   case "checkout.session.async_payment_failed":
    //     case "checkout.session.async_payment_succeeded":
    //       case "checkout.session.completed":
    //   case "checkout.session.expired":
    //      break;

    //   default:
    //     break;
    // }



    return NextResponse.json(
      { message: "Successfully received", rawBody },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling webhook:", err);

    return NextResponse.error({
      message: "Webhook signature verification failed",
      error: err.message,
    });
  }
}

// export default { POST };
console.log("~~~~~~~~~~~~~~~~~~~33333333333333333333333333333333333333~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
