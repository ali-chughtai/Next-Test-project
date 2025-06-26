import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB);
}