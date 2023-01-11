"use strict";

// import the needed modules 
const express = require("express");
const morgan = require("morgan");

// imported handlers here 
const { getAllItems, getItems, getItemById, getItemByName, getItemByCategory, getItemByBodyLocation, updateItemQuantity } = require('./Handlers/ItemHandlers');
const { getCompanies, getCompanyById, getCompanyByName } = require('./Handlers/CompanyHandlers');
const { addNewOrder, deleteOrder, getOrders, getOrderById, addItemToCart, subtractItemFromCart, deleteItemFromCart, updateOrderDetails } = require('./Handlers/OrdersHandlers')

const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

  // REST endpoints?
  .get('/bacon', (req, res) => res.status(200).json('🥓'))

  // ~~~~~~~~~~~~~~~~ITEM~~~~~~~~~~~~~~~~

  // get all items from database 
  .get("/allItems", getAllItems)

  // get items from database based on queries
  .get("/items", getItems)

  // get item by name from database
  .get("/items/name/:itemName", getItemByName)

  // get item by id from database
  .get("/items/id/:itemId", getItemById)

  // get item by category from database
  .get("/items/category/:category", getItemByCategory)

  // get item by body-location from database
  .get("/items/location/:bodyLocation", getItemByBodyLocation)

  // update ONE item quantity in the database
  .patch("/items/update/:itemId", updateItemQuantity)

  // ~~~~~~~~~~~~~~~~COMPANY~~~~~~~~~~~~~~~~

  // get companies from database
  .get("/companies", getCompanies)

  // get company by id from database
  .get("/company/id/:companyId", getCompanyById)

  // get company by name from database
  .get("/company/name/:companyName", getCompanyByName)

  // ~~~~~~~~~~~~~~~~ORDERS~~~~~~~~~~~~~~~~

  // // get all the orders from database
  // .get("/orders", getOrders)

  // get order by id from database
  .get("/order/:cartId", getOrderById)

  // // get order by customer name from database
  // .get("/order/:customerName", getOrderById)

  //post new order in orders database
  .post("/order/:cartId", addNewOrder)

  //delete order in orders database
  .delete("/order/:orderId", deleteOrder)

  //add item to cart
  .post("/order/addItem/:itemId", addItemToCart)

  //subtract item from cart
  .post("/order/subtractItem/:itemId", subtractItemFromCart)

  //delete item to cart
  .delete("/order/deleteItem/:itemId", deleteItemFromCart)

  //update order details
  .patch("/order/updateOrder/:cartId", updateOrderDetails)

  // ~~~~~~~~~~~~~~~~OTHER~~~~~~~~~~~~~~~~

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on specified PORT
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
