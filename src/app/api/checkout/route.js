import Stripe from "stripe";
import { NextResponse } from "next/server";
import { SUCCESSUrl , CANCELUrl} from "@/Component/Urls";

export async function POST(request) {
 
   const successUrl= SUCCESSUrl
   const cancelUrl =  CANCELUrl;
 
  
  try {
    const { cart: cartItems, userDbsId } = await request.json();
    const itemIds = cartItems.map((item) => item._id);
    const itemquantity = cartItems.map((item) => item.quantity);
    console.log('cartItems:- -- -🐝🐝🐝🐝🐝🐝🐝🐝🐝 ==========================', cartItems);
console.log('userDbsId:- -- -🐝🐝🐝🐝🐝🐝🐝🐝🐝 ==========================', userDbsId);

console.log('itemIds:- -- -🐝🐝🐝🐝🐝🐝🐝🐝🐝 ==========================', itemIds);
console.log('itemquantity:- -- -🐝🐝🐝🐝🐝🐝🐝🐝🐝 ==========================', itemquantity);
    if (cartItems.length === 0)
      if (
        cartItems.length === 0 ||
        cartItems.length > 5 ||
        !Array.isArray(cartItems)
      ) {
        return NextResponse.json(
          { error: "Invalid cart items,Only 5 Product is Allowed at one time" },
          { status: 400 }
        );
      }

    let checkoutSession;
    const params = {
      submit_type: "pay",
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 5,
          },
          tax_rates: ["txr_1NsTcuSGcFt4Msz1iK55nNo7"],
        };
      }),

      metadata: {
        product_ids: itemIds.slice(0, 5).join(),
        product_quantity: itemquantity.join(),
        product_id: JSON.stringify(
          cartItems.slice(0, 5).map((item) => item._id)
        ),
        images: JSON.stringify(cartItems.slice(0, 5).map((item) => item.image)),
      },

      //  metadata: {
      //   product_ids: itemIds.join(),
      //   product_quantity: itemquantity.join(),
      //   product_id: JSON.stringify(cartItems.map((item) => item._id)),
      //   images: JSON.stringify(cartItems.map((item) => item.image)),
      // },

      mode: "payment",

      shipping_options: [
        {
          shipping_rate: "shr_1NsTXXSGcFt4Msz180uBQEIR",
        },
      ],

      client_reference_id: userDbsId,

      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",

      success_url:successUrl ,
      cancel_url:  cancelUrl
    };

    const stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2022-11-15",
      }
    );

    checkoutSession = await stripe.checkout.sessions.create(params);

    // return NextResponse.json(  checkoutSession, { status: 200 });
    return NextResponse.json(checkoutSession.id, { status: 200 });

    // res.status(200).json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error(error);
    return NextResponse.error(
      { message: "Failed to create the topic" },
      { status: 500 }
    );
  }
}
 
