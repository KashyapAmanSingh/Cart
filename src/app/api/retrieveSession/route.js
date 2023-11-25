import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY

);

//  "api_version": "2023-08-16",

export async function POST(request) {
  const body = await request.json(); // 👈
  const { session_Id } = body;

  try {
 
    const retrievedSession = await stripe.checkout.sessions.retrieve(
      session_Id,
      {
        include: ["line_items"],
      }
    );

    const { invoice } = retrievedSession;

  
    const invoiceIds = await stripe.invoices.retrieve(invoice);
    const successInvoice = {
      Invoice_url: invoiceIds.hosted_invoice_url,
      Invoice_pdf: invoiceIds.invoice_pdf,
    };

    return NextResponse.json({
      data: { retrievedSession },
      invoiceUrls: { successInvoice },
    });  
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
