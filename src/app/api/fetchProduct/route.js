import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../db/Connection";
import parse from "url-parse";
export async function GET(req) {
  const parsedUrl = parse(req.url, true);
  const {
    filterBy,
    filteredPriceQuery1,
    filteredPriceQuery2,
    sortBy,
    searchBy,
  } = parsedUrl.query;

  console.log(
    parsedUrl,
    "<<<<<<<<~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>>>>>>>>>>>"
  );

  let client, db;
  try {
    const {
      client: databaseClient,
      db: database,
      collection,
    } = await connectToDatabase("topiccollections");
    client = databaseClient;
    db = database;

    console.log("filterBy:", filterBy);
    console.log(
      "filteredPriceQuery1:",
      filteredPriceQuery1,
      typeof filteredPriceQuery1
    );
    console.log(
      "filteredPriceQuery2:",
      filteredPriceQuery2,
      typeof filteredPriceQuery2
    );
    console.log("sortBy:", sortBy);
    console.log("searchBy:", searchBy);

    const mongoQuery = {};

    if (filterBy && filterBy !== "All") {
      console.log("$$$$$$$$$$$$$$  filterBy : $$$$$$$$$$$$$$  ", filterBy);

      mongoQuery.category = filterBy;
    }

    if (filteredPriceQuery1 && filteredPriceQuery2) {
      console.log(
        "$$$$$$$$$$$$$$  filteredPriceQuery1: $$$$$$$$$$$$$$  ",
        filteredPriceQuery1
      );
      console.log(
        "$$$$$$$$$$$$$$$       filteredPriceQuery1: $$$$$$$$$$$$$$  ",
        filteredPriceQuery2
      );

      mongoQuery.price = {
        $gte: parseInt(filteredPriceQuery1, 10),
        $lte: parseInt(filteredPriceQuery2, 10),
      };
    }
    if (searchBy) {
      console.log(
        "$$$$$$$$$$$$$$  searchBy: $$$$$$$$$$$$$$  ",
        searchBy,
        typeof searchBy
      );

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

    console.log("MongoDB Query QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ:", mongoQuery);





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
    //   case "timestamp":
    //     sortField = "timestamp"; // Replace with the actual field in your MongoDB document
    //     sortOrder = -1; // Assuming you want to sort timestamps in descending order
    //     break;
      default:
        // Default sorting logic, if sortBy doesn't match any case
        sortField = ""; // No specific sorting
        sortOrder = 1; // No specific order
        break;
    }
  
const queryWithSorting = sortField ? { [sortField]: sortOrder } : {};
const products = await collection.find(mongoQuery).sort(queryWithSorting).toArray();
 
    console.log("MongoDB Query QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ:", mongoQuery);
    

    console.log(
      "Number of Matching Documents: lllllllllllllllllllll",
      products.length
    );


    console.log(
      products,
      "_______________________________This is product of response bro _________________________"
    );
    //    const products = await collection.find({}).toArray();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
