import Stripe from "stripe";
import { NextResponse } from "next/server";
  
export async function POST(request) {
 try {
   const { cart: cartItems } = await request.json();
   const itemIds = cartItems.map((item) => item.id);
   console.log("Item IDs:", itemIds);
   
   console.log("POST checkout  data coming or not bro POST: ", cartItems );

   if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
     return NextResponse.json({ error: "Invalid cart items" }, { status: 400 });
   }
   let checkoutSession; 
   const params = {
    submit_type: "pay",
    payment_method_types: ["card"],
    invoice_creation: {
      enabled: true,
    },
    line_items: cartItems.map((item) => ({
 
     
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: item.price * 100, 
      },
  
      quantity: item.quantity,
       adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 5,
      },
      // tax_rates: ['txr_1NsTcuSGcFt4Msz1iK55nNo7'], 
      tax_rate: 'txr_1NsTcuSGcFt4Msz1iK55nNo7',

    })),
    mode: "payment",
    shipping_options: [
      {
        shipping_rate: 'shr_1NsTXXSGcFt4Msz180uBQEIR',  
      }
    ],
    
     phone_number_collection: {
      enabled: true,
    },
    billing_address_collection: 'required', 
   
    success_url: `http://localhost:3000/StripeSuccess`,
    cancel_url: `http://localhost:3000/StripeFail`,

  };
  

   const stripe = new Stripe("sk_test_51Nr0qpSGcFt4Msz1nwiCDptTvHH171EgKDiBkfMv0wJz1hJYR8lO0a3Um69sdUo6M0kFGmhlyPF4mxp5ZmT1eFqw002qgRL5Ic");
    checkoutSession = await stripe.checkout.sessions.create(params);
  
    
    // return NextResponse.json(  checkoutSession, { status: 200 });
    return NextResponse.json(checkoutSession.id, { status: 200 });
   

    // res.status(200).json({ sessionId: checkoutSession.id });
 } catch (error) {
   console.error(error);
   return NextResponse.error({ message: "Failed to create the topic" }, { status: 500 });

 }
}





 