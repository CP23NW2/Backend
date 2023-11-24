const { request, response } = require("express");
const express = require("express");
const { Customer } = require("../models");
const app = express.Router();

// CREATE
app.post("/customers", (request,response) => {
    const {customerTel, customerName, customerLastName, address} = request.body;
    Customer.create({
        customerTel, 
        customerName, 
        customerLastName, 
        address
    }).then((customer) => {
        response.json(customer);
    })
});

// READ ID
app.get("/customers/:id", (request, response) => {
    const { id } = request.params;
    console.log('test : ', id);
    Customer.findByPk(parseInt(id)).then((customer) => {
      if (customer) {
        response.json(customer);
      } else {
        response.sendStatus(404);
      }
    });
  });

// READ ALL 
app.get("/customers", (request, response) => {
    Customer.findAll().then((customer) => {
        response.json(customer);
    });
  });

// UPDATE
app.put("/customers/:id", (request, response) => {
    const { id } = request.params;
    const { customerTel, customerName, customerLastName, address } = request.body;
    Customer.update({
        customerTel, 
        customerName, 
        customerLastName, 
        address
    }, {
      where: {
          customerTel: id
      },
      returning: true
    }).then((customer) => {
      response.json(customer);
    });
  });

// DELETE
app.delete("/customers/:id", (request, response) => {
    const { id } = request.params;
    Customer.destroy({
      where: {
        customerTel: id,
      },
    }).then((customer) => {
      response.json(customer);
    });
  });
  
module.exports = app;