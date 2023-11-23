import { NextResponse } from "next/server";
 import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import Review from "../../../../models/Review";
import parse from "url-parse";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../db/Connection";

export async function POST(request) {
  try {
    console.log("Incoming POST request:", request);

    const {
      rating,
      comment,
      productId,
      userId,
   
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

export async function GET(req) {
 
  const parsedUrl = parse(req.url, true);
  const { id } = parsedUrl.query;
 
 
try {
  const objectId =new mongoose.Types.ObjectId(id);

  // const reviews = await Review.find();
   const reviews = await Review.find(objectId).populate("userId");

 

    return NextResponse.json(
      { success: true, reviews: reviews },
      { status: 200 } // OK
    );
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
 