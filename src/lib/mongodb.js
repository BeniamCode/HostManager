// src/lib/mongodb.js

import { MongoClient } from "mongodb";

const uri = 'MONGODB_URI=mongodb://clfurlfaq1sxw9mo5goq090xz:W6wyEVDmcfJfdpjSzvmJqYUM@167.235.240.111:9002/HostManager?readPreference=primary&ssl=false'//process.env.MONGODB_URI;

console.log("uri: ", uri);
// Throw an error if the MONGODB_URI variable is not defined
if (!uri) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const options = {};
let cachedMongo;

const connectToDB = async () => {
  // Create a new MongoClient and connect to the database
  const mongo = await new MongoClient(uri, options).connect();
  // Return the database instance
  return mongo.db("HostManager");
};

export const getDB = async () => {
  // In development mode, use a global variable to cache the database connection
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoConnection) {
      global._mongoConnection = await connectToDB();
      cachedMongo = global._mongoConnection;
    }
    return cachedMongo;
  }
  // In production mode, create a new connection for each request
  const mongo = await connectToDB();
  return mongo;
};

export const Hosts = async () => {
  // Get the database instance and return the hosts collection
  const db = await getDB();
  return db.collection("hosts");
};
