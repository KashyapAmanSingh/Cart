import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
//  import CustomerOrder from "../../../../models/orderUser";
import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);

//  "api_version": "2023-08-16",






export async function POST(request) {
  const body = await request.json(); // 👈
  const { id } = body;
  console.log(
    id,
    "**************************************!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
  );
  const { getUser, isAuthenticated } = getKindeServerSession();
  // console.log(request);
  const user = await getUser();
  // console.log(user.id, "----==================================================given name from backend------------------------------------------------------========================================================");

  await ConnectionMongoosedbs();
  try {
    const retrievedSession = await stripe.checkout.sessions.retrieve(id, {
      include: ["line_items"],
    });

    // const invoice = await stripe.invoices.create({
    //   customer: retrievedSession.customer,
    //   collection_method: 'send_invoice',
    //   days_until_due: 7,
    //   auto_advance: true,
    // });
    // console.log('Invoice created:', invoice.id);

    // await CustomerOrder.create({
    //   id: user.id,
    //   given_name: user.given_name,
    //   family_name: user.family_name,
    //   mobileNumber,
    //   email: user.email,
    //   profilePicture,
    //   address: {
    //     street,
    //     city,
    //     state,
    //     postalCode,
    //     country,
    //   },
    // });
    // console.log(retrievedSession)
    return NextResponse.json({ data: retrievedSession }); // 👈
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
