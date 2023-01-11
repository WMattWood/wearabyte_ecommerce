"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// CLIENT CONFIGURATION
const { MongoClient} = require("mongodb")
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

// get companies from database
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  // Connect client
  await client.connect()
  console.log("Connected")
  const db = client.db("Wearabyte")
  
  try {
    // Find all companies and store in a variable as an array of objects
    let allCompanies = await db.collection("Companies").find().toArray()

    // Check if db query was succesfull
    !allCompanies
    // HTTP response for failed retrieval
    ? res.status(404).json({
      status: 404,
      message: "Failed to located companies"
    })
    // HTTP response for successful retrieval
    : res.status(200).json({
      status: 200,
      message: `Companies Retrieved Successfully`,
      data: allCompanies
    });
  }
  catch(err){
    console.log(err)
  } finally{
    // disconnect from db 
    client.close()
    console.log("Connected")
  }
}

// get company by id from database
const getCompanyById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    // retrieve companyName from URL params
    const companyId = Number(req.params.companyId)
  
    // check if the company exists in the db
    const specifiedCompany = await db.collection("Companies").findOne( { _id: companyId })
  
    // Check if db query was successful
    !specifiedCompany
    // HTTP response for failed retrieval
    ? res.status(404).json({
      status: 404,
      message: `Company Not Found`,
      data: `Company Id: ${companyId}`
    })
    // HTTP response for successful retrieval
    : res.status(200).json({
      status: 200,
      message: `Company ${companyId} Retrieved Successfully`,
      data: specifiedCompany
    });      
  }

  catch(error){
    console.log(error)
  } finally{
    // Disconnect client from database
    client.close()
    console.log("Disconnected")
  }
};

// get company by name from database
const getCompanyByName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  // Connect client
  await client.connect()
  console.log("Connected")
  const db = client.db("Wearabyte")

  // retrieve companyName from URL params
  const companyName = req.params.companyName
  
  try {
    // check if the company exists in the db
    const specifiedCompany = await db.collection("Companies").findOne( { name: companyName })

    // Check if db query was successful
    !specifiedCompany
    // HTTP response for failed retrieval
    ? res.status(404).json({
      status: 404,
      message: `Company Not Found`,
      data: `Company name: ${companyName}`
    })
    // HTTP response for successful retrieval
    : res.status(200).json({
      status: 200,
      message: `Company ${companyName} Retrieved Successfully`,
      data: specifiedCompany
    });
  } catch(error){
    console.log(error)
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
}

module.exports = {
  getCompanies,
  getCompanyById,
  getCompanyByName
}