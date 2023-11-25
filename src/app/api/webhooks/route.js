import { NextResponse } from "next/server";
import { Stripe } from "stripe";

import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";

import axios from "axios";
import { WebhooksUrl } from "@/Component/Urls";

// const endpointSecret =
//    process.env.ENDPOINT_SECRET
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
  // { apiVersion: "2023-08-16" }
);

export async function POST(req, res) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  const parsedBody = JSON.parse(rawBody);
  // const eventType = parsedBody.type;

  // let event;
 
  const Url = WebhooksUrl
  

  try {
    await ConnectionMongoosedbs();

    const response = await axios.post(`${Url}/api/createOrder`, rawBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;

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
