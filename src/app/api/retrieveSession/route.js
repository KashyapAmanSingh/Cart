import { NextResponse } from "next/server";
import Stripe from "stripe";

import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);

//  "api_version": "2023-08-16",

export async function POST(request) {
  const body = await request.json(); // 👈
  const { session_Id } = body;

  try {
    // await ConnectionMongoosedbs();
    const items = await stripe.checkout.sessions.listLineItems( session_Id);

    if (true) {
      console.log( session_Id,
        
        "The User has been found and it's Great 😘 😘 😘 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀"
      );
      console.log(items);
    }  
    
    const retrievedSession = await stripe.checkout.sessions.retrieve(
      session_Id,
      {
        include: ["line_items"],
      }
    );

    return NextResponse.json({ data: { retrievedSession } }); //, newOrder
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
