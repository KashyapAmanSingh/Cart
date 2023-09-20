/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
const { MongoClient } = require("mongodb");
import { NextResponse } from "next/server";

const uri = "mongodb+srv://itsevolution7:NQ8mNlceIbWsSVIG@cluster0.qshtbzf.mongodb.net";
const client = new MongoClient(uri);

// export default async (req, res) => {
  export async function GET() {

  try {
    await client.connect();
    const database = client.db("Crud_dbs");
    const collectionName = "topiccollections";
    const collection = database.collection(collectionName);
 
    const products = await collection.find({}).toArray();
    //  console.log("Fetched products from admin_database:");
    // console.log(products);
    // res.status(201).json({ products }); // Use res.json() to send a JSON response
 
    return NextResponse.json({ products }, { status: 200 });

  } finally {
     await client.close();
  }
  
 
}


 // module.exports = fetchAllDataFromCollection; // Export the function







// const searchText = "Creatine";
// const caseInsensitiveRegex = new RegExp(searchText, "i");
// const products = await collection.find({
//     $or: [
//       { title: { $regex: caseInsensitiveRegex } },
//       { description: { $regex: caseInsensitiveRegex } },
//       { category: { $regex: caseInsensitiveRegex } },
//       { subcategory: { $regex: caseInsensitiveRegex } },
//       { brand: { $regex: caseInsensitiveRegex } },
//       { seller: { $regex: caseInsensitiveRegex } },
//       { model: { $regex: caseInsensitiveRegex } },
//       { tags: { $regex: caseInsensitiveRegex } },
  
//     ]
//   }).toArray();