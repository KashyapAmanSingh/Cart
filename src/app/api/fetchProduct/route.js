import { NextResponse } from "next/server";

import parse from "url-parse";
import ConnectionMongoosedbs from "../../../../db/ConnectionMongoosedbs";
import mongoose from "mongoose";

export async function GET(req) {
  const parsedUrl = parse(req.url, true);
  const {
    filterBy,
    filteredPriceQuery1,
    filteredPriceQuery2,
    sortBy,
    searchBy,
    AssuredBy,
  } = parsedUrl.query;

  try {
    await ConnectionMongoosedbs();

    const mongoQuery = {};

    if (filterBy && filterBy !== "All") {
      mongoQuery.category = filterBy;
    }
    if (AssuredBy && AssuredBy !== "") {
      mongoQuery.is_featured = true;
    }

    if (filteredPriceQuery1 && filteredPriceQuery2) {
      mongoQuery.price = {
        $gte: parseInt(filteredPriceQuery1, 10),
        $lte: parseInt(filteredPriceQuery2, 10),
      };
    }
    if (searchBy) {
      mongoQuery.$or = [
        { title: { $regex: new RegExp(searchBy, "i") } },
        { description: { $regex: new RegExp(searchBy, "i") } },
        { category: { $regex: new RegExp(searchBy, "i") } },
        { subcategory: { $regex: new RegExp(searchBy, "i") } },
        { brand: { $regex: new RegExp(searchBy, "i") } },
        { seller: { $regex: new RegExp(searchBy, "i") } },
        { model: { $regex: new RegExp(searchBy, "i") } },
        { tags: { $regex: new RegExp(searchBy, "i") } },
      ];
    }

    let sortField, sortOrder;

    // Sorting logic based on the value of sortBy
    switch (sortBy) {
      case "asc_price":
        sortField = "price";
        sortOrder = 1;
        break;
      case "des_price":
        sortField = "price";
        sortOrder = -1;
        break;
      case "ratings":
        sortField = "rating"; // Replace with the actual field in your MongoDB document
        sortOrder = -1; // Assuming you want to sort ratings in descending order
        break;
      // Add more cases for other sorting options as needed
      case "discount":
        sortField = "discount"; // Replace with the actual field in your MongoDB document
        sortOrder = -1; // Assuming you want to sort discounts in descending order
        break;
 
      default:
         sortField = null; // No specific sorting
        sortOrder = 1; // No specific order
        break;
    }

    if (sortBy == "timestamp") {
      const queryWithSorting = sortField ? { [sortField]: sortOrder } : {};
      const products = (
        await mongoose.connection
          .collection("productcollections")
          .find(mongoQuery)
          .sort(queryWithSorting)
          .toArray()
      ).reverse();

       return NextResponse.json({ products }, { status: 200 });
    } else {
      const queryWithSorting = sortField ? { [sortField]: sortOrder } : {};
      const products = await mongoose.connection
        .collection("productcollections")
        .find(mongoQuery)
        .sort(queryWithSorting)
        .toArray();
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
