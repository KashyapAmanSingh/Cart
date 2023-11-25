import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "../../../../db/Connection";
import { ObjectId } from "mongodb";

export async function GET(req) {
  let client, db;

  const url = new URL(req.url, process.env.DEVELOPMENT_URL);
  const searchID = url.searchParams.get("id");

  const isValidObjectId = mongoose.Types.ObjectId.isValid(searchID);
  if (isValidObjectId) {
    try {
      const {
        client: databaseClient,
        db: database,
        collection,
      } = await connectToDatabase("productcollections");
      client = databaseClient;
      db = database;
      
      const product = isValidObjectId
        ? await collection.findOne({ _id: new ObjectId(searchID) }) 
        : null;

      console.log("After querying MongoDB");

      if (!product) {
        console.log("Product not found");
      } else {
        console.log("Found product:", product);
      }

      return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
      console.error("Error in GET request:", error);
      return NextResponse.error("Internal Server Error", { status: 500 });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }
}
