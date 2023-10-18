import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";

import { NextResponse } from "next/server";
// import orderPaymentInfo from "../../../../models/paymentInfo";
import AdminOrder from "../../../../models/AdminOrderInfo";
// import UserAddress from "../../../../models/UserAddress";
// import User from "../../../../models/User";

export async function GET() {
  try {
    await ConnectionMongoosedbs();

    // const adminOrders = await AdminOrder.find({})
    //   .populate("orderPaymentInfo")
    //   .exec();
    const adminOrders = await AdminOrder.find({})
    .populate("orderPaymentInfo").populate("userId").populate("userAddress").populate('userAddress')
    .exec();
    


    // ProductTitleQuantity
    //   .populate({ path: 'userAddress', options: { strictPopulate: false } })
     //   .populate("orderPaymentInfo")
    // .populate("userId")
    // .populate("userAddress")
    // .populate({ path: "userId", options: { strictPopulate: false } })

    
    console.log("Admin Orders:", adminOrders);

    return NextResponse.json({
      message: "Fetched successfully",
      adminOrders: adminOrders,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// // export async function GET() {
// //     try {
// //       await ConnectionMongoosedbs();

// //       const adminOrders = await AdminOrder.find({})
// //       .populate('orderpaymentinfos')
// //        .exec();

// //       console.log("Admin Orders:", adminOrders);

// //       return NextResponse.json({
// //         message: "Fetched successfully",
// //         adminOrders: adminOrders,
// //       });
// //     } catch (error) {
// //       console.error("Error fetching admin orders:", error);

// //       return NextResponse.json({
// //         error: "Internal Server Error",
// //       }, {
// //         status: 500,
// //       });
// //     }

// // }
