"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// CLIENT CONFIGURATION
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// get items 
const getAllItems = async (req,res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to database    
        await client.connect(); 
        console.log("Connected")
        const db = client.db("Wearabyte")
        // get all items from database
        const data = await db.collection("Items").find({}).toArray();
        
        (data.length > 0) ?
        // send data
        res.status(200).send({ status: 200, data: data, message: "Success" }) :
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
};

// get items function --> can be used for the filtering if needed (STRETCH)
const getItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to database
        await client.connect(); 
        console.log("Connected")
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
};

// get item by name
const getItemByName = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    // get item id from req params
    const itemName = req.params.itemName;
    try {
        // connect to database
        await client.connect(); 
        console.log("Connected")    
        const db = client.db("Wearabyte")
        // find item by name
        const data = await db.collection("Items").findOne({"name": itemName});

        data !== null ?
        // send data
        res.status(200).send({ status: 200, data: data, message: "Success" }) :
        // send error message
        res.status(404).send({ status: 404, itemName, message: "Invalid item name" })
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
}

// get item by Id 
const getItemById = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    // get itemId using params
    const itemId = Number(req.params.itemId);
    try {
        // connect to database 
        await client.connect();
        console.log("Connected")
        const db = client.db("Wearabyte")

        // find item by id 
        const data = await db.collection("Items").findOne({"_id": itemId})

        data !== null ?
        res.status(200).send({ status: 200, data: data, message: "Success" }) :
        res.status(404).send({ status: 404, itemId, message: "Invalid item id" })
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
};

// get item by category function
const getItemByCategory = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to database
        await client.connect(); 
        console.log("Connected")
        const db = client.db("Wearabyte")

        // get category from req params
        const category = req.params.category;

        // find item by category from items database

        const data = await db.collection("Items").find({ category: category }).toArray();

        (data.length > 0) ?
            // send data
            res.status(200).send({ status: 200, data: data, message: "Success"}) :
            // send error message
            res.status(404).send({ status: 404, category, message: "Invalid category" })
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
};

// get item by body location function
const getItemByBodyLocation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        // connect to database
        await client.connect(); 
        console.log("Connected")    
        const db = client.db("Wearabyte")

        // get body location from req params
        const getBodyLocation = req.params.bodyLocation;
        const bodyLocation = getBodyLocation.charAt(0).toUpperCase() +
            getBodyLocation.slice(1).toLowerCase();

        // find item by body location from items database
        const data = await db.collection("Items").find({ "body_location": bodyLocation }).toArray();

        (data.length > 0) ?
            // send data
            res.status(200).send({ status: 200, data: data, message: "Success" }) :
            // send error message
            res.status(404).send({ status: 404, getBodyLocation, message: "Invalid location" })
    } catch(err) {
        console.log(err)
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
};

// updates item quantity in database
const updateItemQuantity = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    
    // connect to database
    await client.connect(); 
    console.log("Connected")    
    const db = client.db("Wearabyte")

    // retrieve itemId and quantity purchased from the HTTP req.body
    const itemId = Number(req.body.itemId)
    let quantityPurchased = Number(req.body.quantity)
    quantityPurchased = quantityPurchased * -1

    try {
    // itemToUpdate = await db.collection("Items").findOne( { _id: itemId })

    await db.collection("Items").updateOne( { _id: itemId },
                                            { $inc: { numInStock: quantityPurchased } }
                                          )

    res.status(200).send({  status: 200, 
                            data: quantityPurchased, 
                            message: `Success: Item ${itemId} decremented by ${quantityPurchased}` 
                        })
    } catch(err) {
    res.status(404).send({  status: 404, 
                            data: quantityPurchased, 
                            message: `Could not modify Item ${itemId}` })
    } finally {
        // disconnect from database 
        client.close();
        console.log("Disconnected")
    }
}

module.exports = {  getAllItems, 
                    getItems, 
                    getItemByName, 
                    getItemById, 
                    getItemByCategory, 
                    getItemByBodyLocation, 
                    updateItemQuantity
                 }
