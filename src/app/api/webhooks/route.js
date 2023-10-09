import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(
  "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9",
  {
    apiVersion: "2020-08-27", //2023-08-16
  }
);
const stripes = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);
export async function POST(req, res) {
 
  try {
    const sig = req.headers.get("stripe-signature"); // const sig = req.headers['stripe-signature'];
    const rawBody = await req.text();

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
    );

    console.log(
      "Constructed event with type:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
      event.type
    );

    switch (event.type) {
      case "checkout.session.async_payment_failed":
        console.log(
          " %%%%%%%%%%%%%%%%%%%%%%%%%%%%% event.type event.type",
          event.data.object
        );
        break;
      case "checkout.session.async_payment_succeeded":
        console.log(
          " %%%%%%%%%%%%%%%%%%%%%%%%%%%%% event.type event.type",
          event.data.object
        );
        break;
      case "checkout.session.completed":
        console.log(
          " %%%%%%%%%%%%%%%%%%%%%%%%%%%%% event.type event.type",
          event.data.object
        );
        break;
      case "checkout.session.expired":
        console.log(
          " %%%%%%%%%%%%%%%%%%%%%%%%%%%%% event.type event.type",
          event.data.object
        );
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json(
      { message: "Successfully received", rawBody },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.error({
      message: "Webhook signature verification failed",
      error: err.message, // Add more details about the error
    });
  }
}

// export default { POST };
