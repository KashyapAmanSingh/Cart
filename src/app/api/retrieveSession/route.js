import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import mongoose from "mongoose";

import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import AdminOrder from "../../../../models/admin";
import User from "../../../../models/User";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);

//  "api_version": "2023-08-16",

export async function POST(request) {
  const body = await request.json(); // 👈
  const { id  } = body;
  console.log(id);
  // const { getUser, isAuthenticated } = getKindeServerSession();
  // const user = await getUser();

  // const invoice = await stripe.invoices.retrieve("in_1NypUKSGcFt4Msz1e6ndcO1j");

  // window.open(invoicePdfUrl, '_blank');

  try {
    await ConnectionMongoosedbs();

    // const foundUser = await User.find({ id: user.id });
    // const userId = foundUser[0]._id;
    // if (!foundUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const retrievedSession = await stripe.checkout.sessions.retrieve(id, {
      include: ["line_items"],
    });
    // console.log(retrievedSession)

    // const newOrder = await AdminOrder.create({
    //   orderId: "evt_1weijasdfnhlafnhu8hsdf4v3ts",
    //   sessionId:
    //     "cs_test_b1l1S34BJ1NflDH4TFVzNW5kxlfdwhesXqL8mJW6HzyoytMAObJUFHOD0s",
    //   userId: new mongoose.Types.ObjectId(userId),

    //   productId: "6501502a58faf63c5dd7f666",
    //   productQuantity: 2,
    //   orderDate: new Date(),
    //   userAddress: {
    //     street: "123 Mgsdfgdsgain St",
    //     city: "Example dsfgdsfCity",
    //     pincode: "134345",
    //     mobileNumber: "12345sdfsg67890",
    //     email: "dummy@exsdfsample.com",
    //   },
    //   ProductTitle: "Examplesdgfsg Product",
    //   paymentMethod: "Card",
    //   transactionId: "dummyTdsgsdgransactionId789",
    //   Invoice_url: invoice.hosted_invoice_url,
    //   Invoice_pdf: invoice.invoice_pdf,
    //   paymentStatus: "paid",
    //   FinalPaymentStatus: "completed",
    //   shipping_cost: 10.99,
    //   amount_subtotal: 100.0,
    //   amount_total: 110.99,
    // });
    // console.log(newOrder);
 
    // if (newOrder) {
    //   await User.findByIdAndUpdate(userId, {
    //     $set: { orders: newOrder._id },
    //   });
    // }

    return NextResponse.json({ data: { retrievedSession} });  //, newOrder 
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
