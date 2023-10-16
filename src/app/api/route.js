import { NextResponse } from "next/server";
 
import mongoose from "mongoose";
import Stripe from "stripe";
 

 import orderedProductDetail from "../../../models/orderedProduct";
 import UserAddress from "../../../models/UserAddress";
 import orderPaymentInfo from "../../../models/paymentInfo";
import AdminOrder from "../../../models/AdminOrderInfo";
import User from "../../../models/User"







const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
  // { apiVersion: "2023-08-16" }
);

export async function POST(request) {
  const body = await request.json();
  let { data } = body;

  const { id: transactionId, type } = body;

  const incomingData = data;
  const {
    id: sessionId,
    amount_subtotal,
    amount_total,
    created,
    customer_details,

    client_reference_id,
    invoice,
    metadata,
    mode,
    total_details,
  } = incomingData.object;

  const items = await stripe.checkout.sessions.listLineItems(sessionId);

 
  const invoiceIds = await stripe.invoices.retrieve(invoice);

  const { amount_discount, amount_shipping } = total_details;

  const { email, phone, address } = customer_details;

  const { city, country, line1, line2, postal_code, state } = address;
  const street = line1 + " " + line2;
  const { product_ids, product_quantity, product_id, images } = metadata;

  const product_images_url = JSON.parse(images);

  const parsedProductIds = JSON.parse(product_id).map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const productTitleQuantityArray = items.data.map((item, i) => ({
    productIds: parsedProductIds[i],
    title: item.description,
    quantity: item.quantity,
    amount_subtotal: item.amount_subtotal / 100,
    amount_tax: item.amount_tax / 100,
    amount_total: item.amount_total / 100,
    amount_discount: item.amount_discount,
    images: product_images_url[i],
  }));
  
  const foundUser = await User.findOne({ _id: client_reference_id });

  if (!foundUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const orderDate = created ? new Date(created * 1000) : undefined;

    const userAddress = await UserAddress.create({
      street: street,
      city: city,
      pincode: postal_code,
      mobileNumber: phone,
      email: email,
      country: country,
      state: state,
    });
    const createdProductTitleQuantity = await orderedProductDetail.create({
      products: productTitleQuantityArray,
    });
 

    const productTitleQuantityId = createdProductTitleQuantity._id;
 

    const orderPaymentInfoInstance = await orderPaymentInfo.create({
      transactionId,
      sessionId,
      paymentMethod: mode,
      Invoice_url: invoiceIds.hosted_invoice_url,
      Invoice_pdf: invoiceIds.invoice_pdf,
      paymentStatus: "paid",
      FinalPaymentStatus: type,
      shipping_cost: amount_shipping / 100,
      amount_subtotal: amount_subtotal / 100,
      amount_total: amount_total / 100,
      amount_discount: amount_discount / 100,
    });

    const newOrderTest = await AdminOrder.create({
      userId: new mongoose.Types.ObjectId(client_reference_id),
      orderDate,
      orderedProductDetail: productTitleQuantityId,
      userAddress: userAddress._id,
      orderPaymentInfo: orderPaymentInfoInstance._id,
    });

 
    if (newOrderTest) {
      await User.findByIdAndUpdate(client_reference_id, {
        $push: { orders: newOrderTest._id },
      });
    }

    const dummyData = {
      message: "This is dummy data for testing.",
      timestamp: new Date().toISOString(),
      data: {
        key1: "value1",
        key2: "value2",
        
      },
    };

    return NextResponse.json(
      { message: "Successfully received", dummyData },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred:", error, error.message);
    return NextResponse.json(
      { message: "Failed to process the request", error },
      { status: 500 }
    );
  }
}
