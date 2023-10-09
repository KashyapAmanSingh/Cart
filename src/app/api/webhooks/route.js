import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import AdminOrder from "../../../../models/admin";
 
// const endpointSecret =
//   "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9";

export async function POST(req, res) {
  // const stripe = new Stripe(
  //   "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
  //   // { apiVersion: "2023-08-16" }
  // );

  // let event;

  try {
    // const sig = req.headers.get("stripe-signature");
 
    const rawBody = await req.text();

    const parsedBody = JSON.parse(rawBody);    
    const eventType = parsedBody.type;
 
    const paymentQuery = {};

    switch (eventType) {
      case "checkout.session.async_payment_failed":
        paymentQuery.paymentStatus = "failed";
        break;

      case "checkout.session.async_payment_succeeded":
      case "checkout.session.completed":
        paymentQuery.paymentStatus = "paid";
        break;

      case "checkout.session.expired":
        paymentQuery.paymentStatus = "pending";
        break;

      default:
        paymentQuery.paymentStatus = "failed";

        break;
    }

    await AdminOrder.findOneAndUpdate(
      { orderId: "evt_1NypULSGcFt4Msz1Bf4vPxw" },
      {
        $set: {
          paymentStatus: paymentQuery.paymentStatus,
          FinalPaymentStatus: eventType,
        },
      }
    );

    // Now you can use paymentQuery.paymentStatus for any additional logic or updates

   

    // event = await stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
   

    // switch (event.type) {
    //   case "checkout.session.async_payment_failed":
    //   case "checkout.session.async_payment_succeeded":
    //   case "checkout.session.completed":
    //   case "checkout.session.expired":
    //     console.log("Handling event:----- --", event.type);
    //     break;
    //   default:
    //     console.log("Unhandled event type:", event.type);
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
