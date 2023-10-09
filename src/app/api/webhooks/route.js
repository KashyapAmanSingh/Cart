import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import AdminOrder from "../../../../models/admin";
import mongoose from "mongoose";
import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
 import User from "../../../../models/User";

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
  const eventType = parsedBody.type;
    console.log(" getUser====================getUser===================>>> " ,eventType );

 
  // let event;

  const { id: transactionId, type } = parsedBody;
  console.log("id:orderIdorderId orderId orderId orderId", transactionId, type);
 
  let { data } = parsedBody;

   const incomingData = data;
  const {
    id: sessionId,
    amount_subtotal,
    amount_total,
    created,
    currency,

    customer_details,
    invoice,
    metadata,
    mode,
    total_details,
  } = incomingData.object;

  const invoiceIds = await stripe.invoices.retrieve(invoice);
 console.log(invoice,"INVOICES-------------------------------------------------------------------------------888888888888888888888")

     const { amount_discount, amount_shipping, amount_tax } = total_details;

  const { email, name, phone, address } = customer_details;
  console.log(" phone =============phone ===========>>> ", phone   );

  const { city, country, line1, line2, postal_code, state } = address;
  const street = line1 + "" + line2;
  const { product_ids, product_quantity } = metadata;
  const productIdsArray = product_ids.split(",");
  const productQuantityArray = product_quantity.split(",");

  try {
    await ConnectionMongoosedbs();

    const foundUser = await User.find({ mobileNumber: phone });
    const { id: transactionId, type } = parsedBody;
    console.log(foundUser,"-<<<<<<<<<<-------------------------->>>>>>>>>>--------------------------------------->>")
  if (foundUser.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = foundUser[0]._id;
      const newOrder = await AdminOrder.create({
      transactionId: transactionId,  
      sessionId: sessionId,  
      userId: new mongoose.Types.ObjectId(userId),

      products: productIdsArray.map((productId, index) => ({
        productId: new mongoose.Types.ObjectId(productId),
        quantity: parseInt(productQuantityArray[index], 10),
      })),

      orderDate: new Date(created * 1000), 
      userAddress: {
        street: street, 
        city: city,
        pincode: postal_code,
        mobileNumber: phone,
        email: email,
        country: country,
        state: state,
      },
      ProductTitle: "Example Product", // replace with the actual product title
      paymentMethod: mode,
      Invoice_url: invoiceIds.hosted_invoice_url,
      Invoice_pdf: invoiceIds.invoice_pdf,
      paymentStatus: "paid",
      FinalPaymentStatus: type,
      shipping_cost: amount_shipping,
      amount_subtotal: amount_subtotal,
      amount_total: amount_total,
      amount_discount: amount_discount,
    });
    console.log(newOrder);
    if (newOrder) {
      await User.findByIdAndUpdate(userId, {
        $set: { orders: newOrder._id },
      });
    }

    // const paymentQuery = {};

    // switch (eventType) {
    //   case "checkout.session.async_payment_failed":
    //     paymentQuery.paymentStatus = "failed";
    //     break;

    //   case "checkout.session.async_payment_succeeded":
    //   case "checkout.session.completed":
    //     paymentQuery.paymentStatus = "paid";
    //     break;

    //   case "checkout.session.expired":
    //     paymentQuery.paymentStatus = "pending";
    //     break;

    //   default:
    //     paymentQuery.paymentStatus = "failed";

    //     break;
    // }

    // event = await stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);

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
