import { NextResponse } from "next/server";
 import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import Review from "../../../../models/Review";
import parse from "url-parse";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../db/Connection";

export async function POST(request) {
  try {
 
    const {
      rating,
      comment,
      productId,
      userId,
   
    } = await request.json();

   
    if (!rating || !comment || !productId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 } // Bad Request
      );
    }

    await ConnectionMongoosedbs();
    console.log("Received data:----------- ------------------------ -----💖💖💖💖💖💖💖",   productId, userId);

    const newReview = await Review.create({
      rating: rating,
      comment: comment,
      userId:  new mongoose.Types.ObjectId(userId),
      reviewedProductId:  new mongoose.Types.ObjectId(productId),
    });
    
    console.log("Review created successfully:💖",     userId,"-------------------------💖💖", newReview,new mongoose.Types.ObjectId(productId));

    return NextResponse.json(
      { success: true,newReview:newReview, message: "Review created successfully" },
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
    const objectId = new mongoose.Types.ObjectId(id);
    const isValidObjectId = mongoose.Types.ObjectId.isValid(objectId);

    if (isValidObjectId) {
      // const reviews = await Review.find();
      const reviews = await Review.find(objectId).populate("userId");

      return NextResponse.json(
        { success: true, reviews: reviews },
        { status: 200 } // OK
      );
    }
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 } // Internal Server Error
    );
  }
}
