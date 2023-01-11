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

// add new order into database
const addNewOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    // format new card to add
    const newCart = {  _id: uuidv4(),
                        firstName: "",
                        lastName: "",
                        email: "",
                        address: "",
                        creditCard: "",
                        cart: [] 
                      } 

    // insert formatted order to db Orders collection
    await db.collection("Orders").insertOne( newCart )

    res.status(200).json({
      status: 200,
      message: "New Cart Created",
      data: newCart
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "Cart not created"
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

// delete a specific order in orders database
const deleteOrder = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")
    
    // get order Id from req params
    const orderId = req.body.orderId;

    // find order by id
    const order = await db.collection("Orders").findOne( {_id: orderId} )

    // delete order from orders database if order exists
    if (order) {
      await db.collection("Orders").deleteOne( { _id: orderId} );
      res.status(200).json({
        status: 200, 
        message: "Order Deleted"
      })
    } 
  } catch(err) {
    res.status(404).json({
      status:404, 
      orderId: orderId, 
      message: `Order ID ${orderID} does not exist in the database`
    })
  } finally {
    // disconnect from database 
    client.close();
    console.log("Disconnected")
  }
};

// return all orders currently in the db
const getOrders = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    // request all orders in collection
    const allOrders = await db.collection("Orders").findMany( {} )

    res.status(200).json({
      status: 200, 
      message: "Success",
      data: allOrders
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "Orders do not exist"
    })
  } finally {
    // disconnect from database 
    client.close();
    console.log("Disconnected")
  }
}

const getOrderById = async (req, res) => {
  // Connect client
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    // get cartId from req params
    const cartId = req.params.cartId;

    // find all items from items database
    const order = await db.collection("Orders").findOne({_id: cartId})

    res.status(200).json({
      status: 200, 
      data: order,  
      message: "Success"
    })
  } catch(err) {
    res.status(404).json({
      status: 404, 
      cartId: cartId, 
      message: `Invalid Order Id: ${cartId}`
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

// ******* NOTE ****** 
// THIS FUNCTION INCREMENTS THE QUANTITY OF ITEM IN THE DB
// IT WILL CREATE A NEW ELEMENT IN THE CART ARRAY IF NO ELEMENT WITH SAME ID EXISTS
const addItemToCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    const itemId = Number(req.body.itemId);
    const cartId = req.body.cartId;

    // retrieve the item we are planning to add to cart
    let newItem = await db.collection("Items").findOne( { "_id": itemId } )

    // check if itemId is already present in the current cart
    const itemIsInCart = await db.collection("Orders").findOne( { 
                                                                  _id: cartId,
                                                                  cart: { $elemMatch: { _id: itemId } }
                                                                } )
    
    if ( itemIsInCart ) {
      // if item is in the cart already
      // update quantity of item in cart
      await db.collection("Orders").updateOne(  { 
                                                  _id: cartId,
                                                  cart: { $elemMatch: { _id: itemId } }
                                                },
                                                { 
                                                  $inc: { "cart.$.quantity": 1 }
                                                },
                                              )
    } else {
      // if item doesn't exist in the cart yet,
      // set its quantity to 1 and add to cart
      newItem = { ...newItem, quantity: 1 }
      await db.collection("Orders").updateOne(  { 
                                                  _id: cartId 
                                                },
                                                {
                                                  $push: { "cart": newItem } 
                                                },
                                                {
                                                  upsert: true
                                                }
                                              )
    }

    res.status(200).json({
      status: 200,
      message: `Item added to cart`,
      data: newItem
    })
  } catch(err) {
    res.status(400).json({
      status: 400, 
      message: "Item not added to cart"
    })
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

// Subtract one from the quanitity of item in the cart
const subtractItemFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    const itemId = Number(req.body.itemId);
    const cartId = req.body.cartId;

    // retrieve the item we are planning to add to subtract
    let newItem = await db.collection("Items").findOne( { "_id": itemId } )

    // check if itemId is already present in the current cart
    const itemIsInCart = await db.collection("Orders").findOne( { 
                                                                  _id: cartId,
                                                                  cart: { $elemMatch: { _id: itemId } }
                                                                } )
    if ( itemIsInCart ) {
      // if item is in the cart already,
      // update quantity of item in cart
      await db.collection("Orders").updateOne(  { 
                                                  _id: cartId,
                                                  cart: { $elemMatch: { _id: itemId } }
                                                },
                                                { 
                                                  $inc: { "cart.$.quantity": -1 }
                                                },
                                              )
      res.status(200).json({
        status: 200,
        message: `Item subtracted from cart`,
        data: newItem
      })
    } else {
      // if item doesn't exist in the cart yet,
      // return an error because we can't remove it
      res.status(404).json({
        status: 404,
        message: `Item doesn't exist in selected cart`,
        data: newItem
      })
    }
  } catch(err) {
    console.log(err)
  } finally {
    // disconnect from database 
    client.close()
    console.log("Disconnected")
  }
};

// ******* NOTE ****** 
// THIS FUNCTION DELETES AN ITEM COMPLETELY FROM THE DB - 
// IT DOES NOT DECREMENT THE QUANTITY IN THE DB LIKE subtractItemFromCart
const deleteItemFromCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
  
  try {
    // Connect client
    await client.connect()
    console.log("Connected")
    const db = client.db("Wearabyte")

    const itemId = req.body.itemId
    const cartId = req.body.cartId

    // retrieve the item we are planning to delete
    let itemToDelete = await db.collection("Items").findOne( { "_id": itemId } )
    
    // check if itemId is present in the current cart
    const itemIsInCart = await db.collection("Orders").findOne( { 
                                                                  _id: cartId,
                                                                  cart: { $elemMatch: { _id: itemId } }
                                                                } )
    
    // if the item is present in the cart, remove it                                                            
    if ( itemIsInCart ) {
      await db.collection("Orders").updateOne(  { 
                                                  _id: cartId
                                                },
                                                {
                                                  $pull: { cart: { _id: itemId }}
                                                } )
      res.status(200).json({
        status: 200,
        message: `Item deleted`,
        data: itemToDelete
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Item to delete not found`,
        data: itemToDelete
      })
    }
  } catch(err) {
    console.log(err)
  } finally {
    // disconnect from database
    client.close()
    console.log("Disconnected")
}
};

// update order with customer details
const updateOrderDetails = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)

  let orderDetails = req.body;
  const cartId = req.params.cartId;

  try {
      // Connect client
      await client.connect();
      console.log("Connected");
      const db = client.db("Wearabyte");
      
      // update the Order with the details provided by the HTTP req
      await db.collection("Orders").updateOne(  {_id: cartId},
                                                { $set:
                                                  {firstName: orderDetails.firstName,
                                                  lastName: orderDetails.lastName,
                                                  address: orderDetails.address,
                                                  email: orderDetails.email,
                                                  creditCard: orderDetails.creditCard}
                                                }
                                              )
      res.status(200).json({
        status: 200,
        message: `Order Details Updated Successfully`,
        data: orderDetails
      })
    } catch(err) { res.status(404).json({
        status: 404,
        message: "Order Details Could Not Be Updated",
        data: orderDetails
      })
    } finally {
      // disconnect from database
      client.close()
      console.log("Disconnected")
    }
}

module.exports = {
  addNewOrder, 
  deleteOrder, 
  getOrders, 
  getOrderById,
  addItemToCart, 
  subtractItemFromCart,
  deleteItemFromCart,
  updateOrderDetails
}