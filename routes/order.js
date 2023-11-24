const { request, response } = require("express");
const express = require("express");
const { Order } = require("../models");
const app = express.Router();

// CREATE
app.post("/orders", (request,response) => {
    const {orderID, orderName, price, dateOrder, delivery, shippingName, tracking} = request.body;
    Order.create({
        orderID, orderName, price, dateOrder: new Date(dateOrder), delivery, shippingName, tracking
    }).then((order) => {
        response.json(order);
    })
});

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