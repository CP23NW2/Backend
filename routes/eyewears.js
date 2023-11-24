const { request, response } = require("express");
const express = require("express");
const { Eyewear } = require("../models");
const app = express.Router();

// CREATE
app.post("/eyewears", (request,response) => {
    const {eyewearID, eyewearName, orderStatus, datePreparing, dateProcessing, dateComplete, lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT} = request.body;
    Eyewear.create({
        eyewearID, eyewearName, orderStatus, datePreparing: new Date(datePreparing), dateProcessing: new Date(dateProcessing), dateComplete: new Date(dateComplete), lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT
    }).then((eyewear) => {
        response.json(eyewear);
    })
});

// READ ID
app.get("/eyewears/:id", (request, response) => {
    const { id } = request.params;
    console.log('test : ', id);
    Eyewear.findByPk(parseInt(id)).then((eyewear) => {
      if (eyewear) {
        response.json(eyewear);
      } else {
        response.sendStatus(404);
      }
    });
  });

// READ ALL 
app.get("/eyewears", (request, response) => {
    Eyewear.findAll().then((eyewear) => {
        response.json(eyewear);
    });
  });

// UPDATE
app.put("/eyewears/:id", (request, response) => {
    const { id } = request.params;
    const { eyewearID, eyewearName, orderStatus, datePreparing, dateProcessing, dateComplete, lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT } = request.body;
    Eyewear.update({
        eyewearID, eyewearName, orderStatus, datePreparing: new Date(datePreparing), dateProcessing: new Date(dateProcessing), dateComplete: new Date(dateComplete), lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT
    }, {
      where: {
          eyewearID: id
      },
      returning: true
    }).then((eyewear) => {
      response.json(eyewear);
    });
  });

// DELETE
app.delete("/eyewears/:id", (request, response) => {
    const { id } = request.params;
    Eyewear.destroy({
      where: {
        eyewearID: id,
      },
    }).then((eyewear) => {
      response.json(eyewear);
    });
  });
  
module.exports = app;