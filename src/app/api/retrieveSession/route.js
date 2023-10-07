import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);

export async function POST(request) {
  const body = await request.json(); // 👈
  const { id } = body;

  try {
    const retrievedSession = await stripe.checkout.sessions.retrieve(id, {
      include: ["line_items"],
    });
    return NextResponse.json({ data: retrievedSession }); // 👈
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
