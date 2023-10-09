import { NextResponse } from "next/server";
import Stripe from "stripe";
 
import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
 
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const stripe = new Stripe(
  "sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic"
);

//  "api_version": "2023-08-16",

export async function POST(request) {
  const body = await request.json(); // 👈
  const {  session_Id } = body;
   console.log( "----->>>>>->>>>>->>>>>------=====================---------------------->>>>>->>>>>->>>>>->>>>>--",   );
  const { getUser } = getKindeServerSession();
  const user = getUser();
 
    console.log("----------============User->>>>>",   user )
   
  try {
    // await ConnectionMongoosedbs();

    // const foundUser = await User.find({ id: user.id });
    // const userId = foundUser[0]._id;
    // console.log("----------============--------->>>>>",   userId  )

    // if (!foundUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const retrievedSession = await stripe.checkout.sessions.retrieve( session_Id, {
      include: ["line_items"],
    });
 
    
 
    return NextResponse.json({ data: { retrievedSession} });  //, newOrder 
  } catch (error) {
    // console.error("Error processing request:", error);

    return NextResponse.internalServerError({ error: "Internal Server Error" });
  }
}

export default POST;
