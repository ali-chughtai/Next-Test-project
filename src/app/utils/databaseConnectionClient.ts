import { MongoClient } from "mongodb";

let client: MongoClient | null = null; 
let clientPromise: Promise<MongoClient> | null = null;

export async function connectToDatabase() {
  if (!clientPromise) {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your MongoDB URI to .env.local");
    }

    client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect(); 
  }

  const connectedClient = await clientPromise;
  return connectedClient.db(process.env.MONGODB_DB); 
}

process.on("SIGINT", async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0);
  }
});

process.on("SIGTERM", async () => {
  if (client) {
    await client.close();
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0);
  }
});