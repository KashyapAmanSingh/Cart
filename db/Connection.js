 
import { MongoClient } from 'mongodb';

const uri =process.env.MONGODB_URL;
const client = new MongoClient(uri);

export async function connectToDatabase(collectionName) {
  try {
    await client.connect();
    const database = client.db('Crud_dbs');
    const collection = database.collection(collectionName);  
    return { client, db: database, collection };  
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}



