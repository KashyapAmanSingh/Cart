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
  // console.log(req,"")
  try {
    const sig = req.headers.get("stripe-signature"); // const sig = req.headers['stripe-signature'];
    const rawBody = await req.text();
    console.log(
      typeof sig,
      "Signature:---------------------------*********************************************SIG SIG",
      sig
    );
    console.log(
      "PAYLOAD---------------------------*********************************************PAYLOAD",
      rawBody
    );

    const invoice = await stripes.invoices.retrieve("in_1NypUKSGcFt4Msz1e6ndcO1j");
    console.log(' "~~~~~~~~~~~~~ ~~!!!Invoice details !!   ~~~~~~~~~~~~~~~~~~~~ "  :', invoice);
    
    console.log(' __________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________' );

    const hostedInvoiceUrl = invoice.hosted_invoice_url;
    console.log('Hosted Invoice URL________________________:', hostedInvoiceUrl);
  
    // Get the PDF URL for the invoice
    const invoicePdfUrl = invoice.invoice_pdf;
    console.log('Invoice PDF URL________________________:', invoicePdfUrl);
  
    // Now, you can use the PDF URL to download or display the PDF
    // For example, you might want to open it in a new tab:
    window.open(invoicePdfUrl, '_blank');










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

    console.log(
      "================================event<<______-<----------->>______>>>??????????????object."
    );

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
