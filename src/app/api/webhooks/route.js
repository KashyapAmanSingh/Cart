import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(
  "whsec_58ecfad645057c11c0f34aaab2458334b729ee585a470cf8d19064c3cad85ed9",
  {
    apiVersion: "2020-08-27",
  }
);

export async function POST(req, res) {
  try {
    const rawBody = await req.text();
    //  const sig = req.headers['stripe-signature'];            //defect return undefined but no issue
    const sig = req.headers.get("stripe-signature"); //works well but both can be usedd

    console.log(
      "from AFTER sig =========sig sig sig sigs  ===>>>>>>>>>>>>>>>>>>>>>>>>",
      rawBody
    );

    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
    );

    // switch (event.type) {
    //   case "checkout.session.async_payment_failed":
    //     console.log(
    //       "=>>>>> !  ```````````` Handling event: checkout.session.async_payment_failed  !  ````````````"
    //     );
    //     break;
    //   case "checkout.session.async_payment_succeeded":
    //     console.log(
    //       "=>>>>>Handling event: checkout.session.async_payment_succeeded  !  ````````````"
    //     );
    //     break;
    //   case "checkout.session.completed":
    //     console.log(
    //       "=>>>>>Handling event: checkout.session.completed  !  ````````````"
    //     );
    //     break;
    //   case "checkout.session.expired":
    //     console.log(
    //       "=>>>>>  !!    Handling event: checkout.session.expired !  ````````````"
    //     );
    //     break;
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        handleAsyncPaymentFailed(checkoutSessionAsyncPaymentFailed);
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        handleAsyncPaymentSucceeded(checkoutSessionAsyncPaymentSucceeded);
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        handleCheckoutSessionCompleted(checkoutSessionCompleted);
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        handleCheckoutSessionExpired(checkoutSessionExpired);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Define functions to handle each event type
    function handleAsyncPaymentFailed(data) {
      console.log(
        "Async Payment Failed:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
        data
      );
    }

    function handleAsyncPaymentSucceeded(data) {
      console.log(
        "Async Payment Succeeded:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
        data
      );
    }

    function handleCheckoutSessionCompleted(data) {
      console.log(
        "Checkout Session Completed:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
        data
      );
    }

    function handleCheckoutSessionExpired(data) {
      console.log(
        "Checkout Session Expired:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
        data
      );
    }

    console.log(
      "================================event<<______-<----------->>______>>>??????????????object."
    );

    return NextResponse.json(
      { message: "Successfully received" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.error({
      message: "Webhook signature verification failed",
    });
  }
}

export default { POST };
