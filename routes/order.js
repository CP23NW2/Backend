const { request, response } = require("express");
const express = require("express");
const { Order } = require("../models");
const app = express.Router();
const { v4: uuidv4 } = require('uuid');
const e = require("express");

app.post("/orders", async (request, response) => {
  function hasNonSpaceCharacters(inputString) {
    // Define a regular expression to match any character that is not a space
    const nonSpaceRegex = /\S/;
  
    // Test if the input string contains non-space characters
    return nonSpaceRegex.test(inputString);
  }

  const { orderName, price, dateOrder, delivery, shippingName, tracking, customerID } = request.body;
  
  if (!orderName && !price && !dateOrder && !delivery && !customerID) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if (!orderName && !price && !dateOrder && !delivery) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if (!orderName && !price && !dateOrder && !customerID) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if (!orderName && !price && !delivery && !customerID) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if (!orderName && !dateOrder && !delivery && !customerID) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if (!price && !dateOrder && !delivery && !customerID) {
    return response.status(400).json({ error: "Please check your input again!" });
  } else if(!orderName){
    return response.status(400).json({ error: "Missing required Order Name" });
  } else if(!price){
    return response.status(400).json({ error: "Missing required Price" });
  } else if(!dateOrder){
    return response.status(400).json({ error: "Missing required Date of Order" });
  } else if(!delivery){
    return response.status(400).json({ error: "Missing required Delivery" });
  } else if(!customerID){
    return response.status(400).json({ error: "Missing required CustomerID" });
  }  else if (isNaN(price)){
    return response.status(400).json({ error: "Price must be a numeric" });
  } else if (!hasNonSpaceCharacters(orderName.toString())){
    return response.status(400).json({ error: "Order Name can't contain spacebar" });
  } else if (!price){
    return response.status(400).json({ error: "Missing required Price of Order" });
  }
  // Generate a unique orderID
  const orderID = await generateRandomOrderID();

  try {
      // Check if an order with the generated orderID already exists
      const existingOrder = await Order.findOne({ where: { orderID } });

      if (existingOrder) {
          // If an existing order is found, handle the situation accordingly
          return response.status(400).json({ error: "OrderID must be unique" });
      }

      // Create a new order
      const newOrder = await Order.create({
          orderID,
          orderName,
          price,
          dateOrder: new Date(dateOrder),
          delivery,
          shippingName,
          tracking,
          customerID
      });

      response.json(newOrder);
  } catch (error) {
      console.error("Error creating order:", error);
      response.status(500).json({ error: "Internal Server Error" });
  }
});

async function generateRandomOrderID() {
  // Generate a random 10-digit orderID
  return Math.floor(Math.random() * 90000000) + 10000000;
}

// READ ID
app.get("/orders/:id", (request, response) => {
    const { id } = request.params;
    console.log('test : ', id);
    Order.findByPk(parseInt(id)).then((order) => {
      if (order) {
        response.json(order);
      } else {
        response.sendStatus(404);
      }
    });
  });

// READ ALL 
app.get("/orders", (request, response) => {
    Order.findAll().then((order) => {
        response.json(order);
    });
  });

// UPDATE
app.put("/orders/:id", (request, response) => {
    const { id } = request.params;
    const { orderID, orderName, price, dateOrder, delivery, shippingName, tracking } = request.body;
    Order.update({
        orderID, orderName, price, dateOrder: new Date(dateOrder), delivery, shippingName, tracking
    }, {
      where: {
          orderID: id
      },
      returning: true
    }).then((order) => {
      response.json(order);
    });
  });

// DELETE
app.delete("/orders/:id", (request, response) => {
    const { id } = request.params;
    Order.destroy({
      where: {
        orderID: id,
      },
    }).then((order) => {
      response.json(order);
    });
  });
  
module.exports = app;