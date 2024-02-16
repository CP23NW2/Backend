const { request, response } = require("express");
const express = require("express");
const { Eyewear } = require("../models");
const app = express.Router();

// CREATE
app.post("/eyewears", async (request, response, next) => {
  try {
    const {
      eyewearID,
      eyewearName,
      orderStatus,
      datePreparing,
      dateProcessing,
      dateComplete,
      lens,
      detail,
      price,
      leftSPH,
      leftCYL,
      leftAXIS,
      leftADD,
      leftPD,
      leftSH,
      leftUpKT,
      rightSPH,
      rightCYL,
      rightAXIS,
      rightADD,
      rightPD,
      rightSH,
      rightUpKT,
      orderID
    } = request.body;

    //Sorting CusotmerID by DESC
    const sortEyewearID = await Eyewear.findOne({
      order: [["eyewearID", "DESC"]]
    });

    // Generate the next EyewearID
    const nextEyewearID = sortEyewearID
      ? incrementEyewearID(sortEyewearID.eyewearID)
      : generateInitialEyewearID();

    // Check for duplicates
    const isDuplicate = await Eyewear.findOne({
      where: { eyewearID: nextEyewearID }
    });

    if (isDuplicate) {
      // Handle duplicate case (you may want to retry or return an error)
      return response
        .status(500)
        .json({ error: "Failed to generate a unique EyewearID" });
    }

    // Function to increment the EyewearID
    function incrementEyewearID(sortEyewearID) {
      const numericID = parseInt(sortEyewearID, 10);
      return (numericID + 1).toString();
    }

    // Function to generate an initial EyewearID if no records exist
    function generateInitialEyewearID() {
      return "1"; // or any starting value you prefer
    }

    await Eyewear.create({
      eyewearID: nextEyewearID,
      eyewearName,
      orderStatus,
      datePreparing: new Date(datePreparing),
      dateProcessing: new Date(dateProcessing),
      dateComplete: new Date(dateComplete),
      lens,
      detail,
      price,
      leftSPH,
      leftCYL,
      leftAXIS,
      leftADD,
      leftPD,
      leftSH,
      leftUpKT,
      rightSPH,
      rightCYL,
      rightAXIS,
      rightADD,
      rightPD,
      rightSH,
      rightUpKT,
      orderID
    });

    response.json({ success: true });
  } catch (error) {
    // Pass the error to the Express error handling middleware
    next(error);
  }
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
    const { eyewearID, eyewearName, orderStatus, datePreparing, dateProcessing, dateComplete, lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT, orderID } = request.body;
    Eyewear.update({
        eyewearID, eyewearName, orderStatus, datePreparing: new Date(datePreparing), dateProcessing: new Date(dateProcessing), dateComplete: new Date(dateComplete), lens, detail, price, leftSPH, leftCYL, leftAXIS, leftADD, leftPD, leftSH, leftUpKT, rightSPH, rightCYL, rightAXIS, rightADD, rightPD, rightSH, rightUpKT, orderID
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