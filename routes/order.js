const { request, response } = require("express");
const express = require("express");
const { Order } = require("../models");
const app = express.Router();
const { v4: uuidv4 } = require('uuid');

app.post("/orders", async (request, response) => {
  const { orderName, price, dateOrder, delivery, shippingName, tracking } = request.body;

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
          tracking
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