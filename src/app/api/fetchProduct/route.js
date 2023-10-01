import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../db/Connection";

export async function GET(req) {
 
  let client, db;
  try {
    const {
      client: databaseClient,
      db: database,
      collection,
    } = await connectToDatabase("topiccollections");
    client = databaseClient;
    db = database;

    const url = new URL(req.url, "http://localhost:3000");
    const sortBy = url.searchParams.get("sortBy");
    const searchBy = url.searchParams.get("searchBy");
    const filteredPriceQuery1 = url.searchParams.get("filteredPriceQuery1");

    const filteredPriceQuery2 = url.searchParams.get("filteredPriceQuery2");

    const filterBy = url.searchParams.get("filterBy");

    console.log("sortBy:", sortBy);
    console.log("searchBy:", searchBy);
    console.log("filteredPriceQuery1:", filteredPriceQuery1);
    console.log("filteredPriceQuery2:", filteredPriceQuery2);
    console.log("filterBy:", filterBy);

    if (sortBy) {
      const sortCriteria = {};

      switch (sortBy) {
        case "asc_price":
          sortCriteria.price = 1;
          break;
        case "des_price":
          sortCriteria.price = -1;
          break;
        case "ratings":
          sortCriteria.ratings = -1;
          break;
        case "timestamp":
          sortCriteria.timestamp = -1;
          break;
        case "discount":
          sortCriteria.discount = -1; // Sort by discount in descending order
          break;
        default:
          // Handle other cases if needed
          break;
      }

      const products = await collection.find({}).sort(sortCriteria).toArray();
      return NextResponse.json({ products }, { status: 200 });
    } else if (searchBy) {
      const searchText = searchBy;
      const caseInsensitiveRegex = new RegExp(searchText, "i");
      const products = await collection
        .find({
          $or: [
            { title: { $regex: caseInsensitiveRegex } },
            { description: { $regex: caseInsensitiveRegex } },
            { category: { $regex: caseInsensitiveRegex } },
            { subcategory: { $regex: caseInsensitiveRegex } },
            { brand: { $regex: caseInsensitiveRegex } },
            { seller: { $regex: caseInsensitiveRegex } },
            { model: { $regex: caseInsensitiveRegex } },
            { tags: { $regex: caseInsensitiveRegex } },
          ],
        })
        .toArray();
      return NextResponse.json({ products }, { status: 200 });
    } else {
      const products = await collection.find({}).toArray();
      return NextResponse.json({ products }, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
// else if (filterBy) {
//   const products = await collection
//     .find({ category: filterBy })
//     .sort({ price: 1 }) // Sort by price in ascending order
//     .toArray();
//   return NextResponse.json({ products }, { status: 200 });
// }
