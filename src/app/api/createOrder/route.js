import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "../../../../models/User";
import mongoose from "mongoose";
import Stripe from "stripe";
import AdminOrder from "../../../../models/admin";
import axios from "axios";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
  // { apiVersion: "2023-08-16" }
);

export async function POST(request) {
  //   const { getUser } = getKindeServerSession();
  //   const user = getUser();
  // console.log(user,"THIS IS THE USERS BRO ")
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
  console.log(
    client_reference_id,
    "User not authenticated. Please sign in or register.💀💀💀💀💀"
  );

  const invoiceIds = await stripe.invoices.retrieve(invoice);

  const { amount_discount, amount_shipping } = total_details;

  const { email, phone, address } = customer_details;

  const { city, country, line1, line2, postal_code, state } = address;
  const street = line1 + " " + line2;
  const { product_ids, product_quantity } = metadata;

  const productIdsArray = product_ids.split(",");
  const productQuantityArray = product_quantity.split(",");

  try {
    console.log(
      "-------------------------------------------------------------------------------------------BEFORE USER DECALARATION "
    );

    const foundUser = await User.findOne({ _id: client_reference_id });

    if (foundUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    } else {
      console.log(
        "The User has been found and ite Great😘 😘 😘 😘 💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀 ",
        foundUser
      );
    }

 
    try {
      const newOrder = await AdminOrder.create({
        transactionId: transactionId,
        sessionId: sessionId,
        userId: new mongoose.Types.ObjectId(client_reference_id),
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
        ProductTitle: "Example Product",
        paymentMethod: mode,
        Invoice_url: invoiceIds.hosted_invoice_url,
        Invoice_pdf: invoiceIds.invoice_pdf,
        paymentStatus: "paid",
        FinalPaymentStatus: type,
        shipping_cost: amount_shipping / 100,
        amount_subtotal: amount_subtotal / 100,
        amount_total: amount_total / 100,
        amount_discount: amount_discount,
      });

      console.log(newOrder);

      if (newOrder) {
        await User.findByIdAndUpdate(client_reference_id, {
          $push: { orders: newOrder._id },
        });
      }
    } catch (error) {
      console.error(
        error,
        "This is the error from the user Create Order backend api/create order"
      );
    }

    const dummyData = {
      message: "This is dummy data for testing.",
      timestamp: new Date().toISOString(),
      data: {
        key1: "value1",
        key2: "value2",
        // Add more dummy data as needed
      },
    };

    return NextResponse.json(
      { message: "Successfully received", dummyData },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors here
    return NextResponse.json(
      { message: "Failed fully lag received", error },
      { status: 400 }
    );
  }
}
