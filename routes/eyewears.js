const { request, response } = require("express");
const express = require("express");
const { Eyewear } = require("../models");
const app = express.Router();

function hasNonSpaceCharacters(inputString) {
    // Define a regular expression to match any character that is not a space
    const nonSpaceRegex = /\S/;
  
    // Test if the input string contains non-space characters
    return nonSpaceRegex.test(inputString);
  }

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

    if(!eyewearName){
      return response.status(400).json({ error: "Missing required Eyewear Name" });
    } else if(!hasNonSpaceCharacters(eyewearName.toString())){
      return response.status(400).json({ error: "Eyewear Name can't contain spacebar" });
    } else if(!lens){
      return response.status(400).json({ error: "Missing required Lens" });
    } else if(!hasNonSpaceCharacters(lens.toString())){
      return response.status(400).json({ error: "Lens can't contain spacebar" });
    } else if (!price){
      return response.status(400).json({ error: "Missing required Price of Eyewear" });
    } else if (isNaN(price)){
    return response.status(400).json({ error: "Price must be a numeric" });
    } else if(!orderStatus){
      return response.status(400).json({ error: "Missing Status" });
    }

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