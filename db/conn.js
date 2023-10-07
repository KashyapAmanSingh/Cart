import mongoose from "mongoose";

async function Conn() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default ConnectionMongoosedbs;

// import { MongoClient } from 'mongodb';

// const uri = "mongodb+srv://itsevolution7:NQ8mNlceIbWsSVIG@cluster0.qshtbzf.mongodb.net";
// const client = new MongoClient(uri);

// export async function connectToDatabase(collectionName) {
//   try {
//     await client.connect();
//     const database = client.db('Crud_dbs');
//     const collection = database.collection(collectionName);
//     return { client, db: database, collection }; // Make sure to return the client and db
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     throw error;
//   }
// }
