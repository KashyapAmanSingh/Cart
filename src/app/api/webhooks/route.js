import { NextResponse } from "next/server";
import { Stripe } from "stripe";

import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";

import axios from "axios";

// const endpointSecret =
//   "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9";
const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
  // { apiVersion: "2023-08-16" }
);

export async function POST(req, res) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  const parsedBody = JSON.parse(rawBody);
  // const eventType = parsedBody.type;

  // let event;
  const isDevelopment = process.env.NODE_ENV === "development";
  const Url = isDevelopment
    ? "http://localhost:3000"
    : "https://muscle-schema-mage.vercel.app";

 

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
