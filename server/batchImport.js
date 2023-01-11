const companiesArray = require("./data/companies.json")
const itemsArray = require("./data/items.json")

////// CLIENT CONFIGURATION //////
const { MongoClient } = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

////// BATCH IMPORT FUNCTION //////
const batchImport = async(collectionName, dataArray) => {
  const client = new MongoClient(MONGO_URI, options)
  await client.connect()
  console.log("Client connected.")
  const db = client.db("Wearabyte")  
  await db.collection(collectionName).insertMany(dataArray)
  client.close()
  console.log("Client disconnected.")
}

batchImport("Items", itemsArray)
batchImport("Companies", companiesArray)