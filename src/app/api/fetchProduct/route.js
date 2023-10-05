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
  console.log("$$$$$$$$$$$$$$  searchBy: $$$$$$$$$$$$$$  ", searchBy, typeof searchBy);
  
  mongoQuery.$or = [
    { title: { $regex: new RegExp(searchBy, "i") } },
    { description: { $regex: new RegExp(searchBy, "i") } },
    { category: { $regex: new RegExp(searchBy, "i") } },
    { subcategory: { $regex: new RegExp(searchBy, "i") } },
    { brand: { $regex: new RegExp(searchBy, "i") } },
    { seller: { $regex: new RegExp(searchBy, "i") } },
    { model: { $regex: new RegExp(searchBy, "i") } },
    { tags: { $regex: new RegExp(searchBy, "i") } }
  ];
}



    console.log("MongoDB Query QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ:", mongoQuery);

    const products = await collection.find(mongoQuery).toArray();
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



// const products = await collection
//     .find({
//      $or: [
//       { title: { $regex: new RegExp(searchBy, "i") } }
//       { description: { $regex: new RegExp(searchBy, "i") } }
//       { category: { $regex: new RegExp(searchBy, "i") } }
//       { subcategory: { $regex: new RegExp(searchBy, "i") } }
//       { brand: { $regex: new RegExp(searchBy, "i") } }
//       { seller: { $regex: new RegExp(searchBy, "i") } }
//       { model: { $regex: new RegExp(searchBy, "i") } }
//       { tags: { $regex: new RegExp(searchBy, "i") } }
//      ],
//     })
//     .toArray();









