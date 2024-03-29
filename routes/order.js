const { request, response } = require("express");
const express = require("express");
const { Order, Eyewear, Customer } = require("../models");
// const { Eyewear } = require("../models");
const app = express.Router();
const { v4: uuidv4 } = require("uuid");
const { Op } = require('sequelize');

async function generateRandomOrderID() {
  // Generate a random 10-digit orderID
  return Math.floor(Math.random() * 90000000) + 10000000;
}

function hasNonSpaceCharacters(inputString) {
  // Define a regular expression to match any character that is not a space
  const nonSpaceRegex = /\S/;
  // Test if the input string contains non-space characters
  return nonSpaceRegex.test(inputString);
}

//Creat order and eyewear
app.post("/orderEyewear", async (request, response) => {
  const {
    orderName,
    price,
    dateOrder,
    delivery,
    shippingName,
    tracking,
    customerID,
    eyewearItems,
  } = request.body;

  // Generate a unique orderID
  const orderID = await generateRandomOrderID();
  // Check if an order with the generated orderID already exists
  const existingOrder = await Order.findOne({ where: { orderID } });

  if (existingOrder) {
    // If an existing order is found, handle the situation accordingly
    return response.status(400).json({ error: "OrderID must be unique" });
  }

  if (!orderName) {
    return response.status(400).json({ error: "Missing required Order Name" });
  } else if (!price) {
    return response.status(400).json({ error: "Missing required Price" });
  } else if (!dateOrder) {
    return response
      .status(400)
      .json({ error: "Missing required Date of Order" });
  } else if (!delivery) {
    return response.status(400).json({ error: "Missing required Delivery" });
  } else if (!customerID) {
    return response.status(400).json({ error: "Missing required CustomerID" });
  } else if (isNaN(price)) {
    return response.status(400).json({ error: "Price must be a numeric" });
  } else if (!hasNonSpaceCharacters(orderName.toString())) {
    return response
      .status(400)
      .json({ error: "Order Name can't contain spacebar" });
  } else if (!price) {
    return response
      .status(400)
      .json({ error: "Missing required Price of Order" });
  }
  try {
    // Create the order
    const order = await Order.create({
      orderID,
      orderName,
      price,
      dateOrder,
      delivery,
      shippingName,
      tracking,
      customerID,
    });

    // Create eyewear items associated with the order
    for (const eyewearData of eyewearItems) {
      //Sorting CusotmerID by DESC
      const sortEyewearID = await Eyewear.findOne({
        order: [["eyewearID", "DESC"]],
      });

      // Generate the next EyewearID
      const nextEyewearID = sortEyewearID
        ? incrementEyewearID(sortEyewearID.eyewearID)
        : generateInitialEyewearID();

      // Check for duplicates
      const isDuplicate = await Eyewear.findOne({
        where: { eyewearID: nextEyewearID },
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

      // validate
      if (!eyewearData.eyewearName) {
        return response
          .status(400)
          .json({ error: "Missing required Eyewear Name" });
      } else if (!hasNonSpaceCharacters(!eyewearData.eyewearName.toString())) {
        return response
          .status(400)
          .json({ error: "Eyewear Name can't contain spacebar" });
      } else if (!eyewearData.lens) {
        return response.status(400).json({ error: "Missing required Lens" });
      } else if (!hasNonSpaceCharacters(eyewearData.lens.toString())) {
        return response
          .status(400)
          .json({ error: "Lens can't contain spacebar" });
      } else if (!eyewearData.price) {
        return response
          .status(400)
          .json({ error: "Missing required Price of Eyewear" });
      } else if (isNaN(price)) {
        return response.status(400).json({ error: "Price must be a numeric" });
      } else if (!eyewearData.orderStatus) {
        return response.status(400).json({ error: "Missing Status" });
      }
      await Eyewear.create({
        ...eyewearData,
        eyewearID: nextEyewearID,
        datePreparing: new Date(),
        dateProcessing: null,
        dateComplete: null,
        orderID: order.orderID // Associate eyewear item with the created order
      })
    }
    response.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error creating order:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/orders", async (request, response) => {
  const {
    orderName,
    price,
    dateOrder,
    delivery,
    shippingName,
    tracking,
    customerID,
  } = request.body;

  if (!orderName) {
    return response.status(400).json({ error: "Missing required Order Name" });
  } else if (!price) {
    return response.status(400).json({ error: "Missing required Price" });
  } else if (!dateOrder) {
    return response
      .status(400)
      .json({ error: "Missing required Date of Order" });
  } else if (!delivery) {
    return response.status(400).json({ error: "Missing required Delivery" });
  } else if (!customerID) {
    return response.status(400).json({ error: "Missing required CustomerID" });
  } else if (isNaN(price)) {
    return response.status(400).json({ error: "Price must be a numeric" });
  } else if (!hasNonSpaceCharacters(orderName.toString())) {
    return response
      .status(400)
      .json({ error: "Order Name can't contain spacebar" });
  } else if (!price) {
    return response
      .status(400)
      .json({ error: "Missing required Price of Order" });
  }

  try {
    // Generate a unique orderID
    const orderID = await generateRandomOrderID();
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
      customerID,
    });
    response.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// READ ID
app.get("/orders/:id", (request, response) => {
  const { id } = request.params;
  console.log("test : ", id);
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

// อ่าน eyewear ที่เกี่ยวข้องกับ orderID ที่กำหนด
app.get("/orders/:id/eyewear", async (request, response) => {
  const { id } = request.params;

  try {
    // ค้นหา eyewear ที่สัมพันธ์กับ orderID ที่กำหนด
    const eyewear = await Eyewear.findAll({
      where: {
        orderID: id // ระบุ orderID ที่ต้องการ
      }
    });

    if (eyewear.length > 0) {
      response.json(eyewear);
    } else {
      response.sendStatus(404); // ไม่พบ eyewear สำหรับ orderID ที่กำหนด
    }
  } catch (error) {
    console.error('Error fetching eyewear:', error);
    response.status(500).json({ error: 'Failed to fetch eyewear' });
  }
});

// UPDATE Status for multiple eyewearIDs in the same orderID
app.put("/eyewears/manyStatus/:orderID", async (request, response) => {
  const { orderID } = request.params;
  const updates = request.body; // ข้อมูลการอัปเดตที่ส่งมา

  try {
    // ดึง eyewear ทั้งหมดที่เกี่ยวข้องกับ orderID ที่ระบุ
    const eyewears = await Eyewear.findAll({ where: { orderID } });

    // ตรวจสอบว่ามี eyewear ที่เกี่ยวข้องกับ orderID นี้หรือไม่
    if (!eyewears || eyewears.length === 0) {
      return response.status(404).json({ error: `No eyewear found for orderID ${orderID}` });
    }

    // อัปเดต orderStatus สำหรับ eyewear แต่ละอันตามข้อมูลที่รับมา
    const updatedEyewear = await Promise.all(updates.map(async (updateData) => {
      const { eyewearID, orderStatus } = updateData;

      // ตรวจสอบว่า eyewearID ที่ระบุอยู่ในรายการ eyewear ที่เกี่ยวข้องกับ orderID นี้หรือไม่
      const eyewearToUpdate = eyewears.find(eyewear => eyewear.eyewearID === eyewearID);
      if (!eyewearToUpdate) {
        throw new Error(`Eyewear not found with eyewearID ${eyewearID} in orderID ${orderID}`);
      }

      // อัปเดต orderStatus และข้อมูลอื่น ๆ สำหรับ eyewear นี้
      await eyewearToUpdate.update({ orderStatus });

      return eyewearToUpdate;
    }));

    response.json(updatedEyewear);
  } catch (error) {
    console.error('Error updating eyewear status:', error.message); // แสดงข้อความของ error ที่เป็นประโยชน์
    response.status(500).json({ error: error.message }); // ส่งข้อความของ error กลับไปยัง client
  }
});

// UPDATE
app.put("/orders/:id", (request, response) => {
  const { id } = request.params;
  const {
    orderID,
    orderName,
    price,
    dateOrder,
    delivery,
    shippingName,
    tracking,
    
  } = request.body;
  Order.update(
    {
      orderID,
      orderName,
      price,
      dateOrder,
      delivery,
      shippingName,
      tracking,
    },
    {
      where: {
        orderID: id,
      },
      returning: true,
    }
  ).then((order) => {
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
