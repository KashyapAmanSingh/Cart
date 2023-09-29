import { NextResponse } from "next/server";
 import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import Review from "../../../../models/Review";
 
export async function POST(request) {
  try {
    console.log("Incoming POST request:", request);

    const {
      rating,
      comment,
      productId,
      userId,
      //  specialId
    } = await request.json();

    console.log("Received data:", rating, comment, productId, userId);

    if (!rating || !comment || !productId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 } // Bad Request
      );
    }

    await ConnectionMongoosedbs();

    const newReview = await Review.create({
      rating: rating,
      comment: comment,
      userId: userId,
      productId: productId,
    });

    console.log("Review created successfully:", newReview);

    return NextResponse.json(
      { success: true, message: "Review created successfully" },
      { status: 201 } // Created
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
