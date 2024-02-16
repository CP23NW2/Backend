const { request, response } = require("express");
const express = require("express");
const { Customer } = require("../models");
const app = express.Router();

// CREATE
app.post("/customers", async (request, response) => {
  const { customerID, customerTel, customerName, customerLastName, address } =
    request.body;

  // Function to generate a random 10-digit customerID
  function generateCustomerID() {
    const randomID = Math.floor(1000000000 + Math.random() * 9000000000); // Generate a random 10-digit number
    return randomID.toString(); // Convert the number to a string
  }
  //validate spacebar
  function hasNonSpaceCharacters(inputString) {
    // Define a regular expression to match any character that is not a space
    const nonSpaceRegex = /\S/;

    // Test if the input string contains non-space characters
    return nonSpaceRegex.test(inputString);
  }

  if (!/^0[689].*/.test(customerTel)) {
    return response.status(400).json({
      error:
        "Phone Number should start with '06', '08', or '09', Please check your input again!",
    });
  }
  try {
    const { customerTel, customerName, customerLastName, address } =
      request.body;

    const customerID = generateCustomerID();
    const customerTelAsNumber = customerTel;

    // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
    if (isNaN(customerTelAsNumber)) {
      return response
        .status(400)
        .json({ error: "Phone Number should be a valid number" });
    }

    //ตรวจสอบ customerID ซ้ำ
    let isDuplicate = await Customer.findOne({ where: { customerID } });
    while (isDuplicate) {
      // ถ้า customerID ซ้ำกับอันอื่น สร้าง customerID ใหม่
      customerID = generateCustomerID();
      isDuplicate = await Customer.findOne({ where: { customerID } });
    }

    // ตรวจสอบความยาวของ customerTel
    if (customerTel.toString().length !== 10) {
      return response
        .status(400)
        .json({ error: "Phone Number should equal to 10 characters" });
    }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
    const existingCustomer = await Customer.findOne({
      where: { customerTel: customerTelAsNumber },
    });
    if (existingCustomer) {
      return response.status(400).json({
        error: "Phone Number must be unique",
      });
    }

    if (!hasNonSpaceCharacters(customerTel.toString())) {
      return response
        .status(400)
        .json({ error: "Phone Number contain only numbers" });
    }

    // ตรวจสอบความถูกต้องของ customerName
    if (typeof customerName !== "string" || customerName.trim() === "") {
      return response.status(400).json({ error: "Name must not be blank" });
    }

    if (
      typeof customerLastName !== "string" ||
      customerLastName.trim() === ""
    ) {
      return response
        .status(400)
        .json({ error: "Last Name must not be blank" });
    }

    // เพิ่มข้อมูลลงในฐานข้อมูล
    const newCustomer = await Customer.create({
      customerID,
      customerTel: customerTelAsNumber, // หรือให้ customerTel เป็น string ขึ้นอยู่กับการตั้งค่าของฐานข้อมูล
      customerName,
      customerLastName,
      address,
    });

    response.json(newCustomer);
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating customer:", error);

    // Check if it's a Sequelize validation error
    if (error.name === "SequelizeValidationError") {
      // Extract the error messages from the validation error
      const validationErrors = error.errors.map((e) => e.message);

      response
        .status(400)
        .json({ error: "Validation error", details: validationErrors });
    } else {
      // For other types of errors
      response.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.post("/customers/validateTel", async (request, response) => {
  try {
    const { customerTel } = request.body;
    const customerTelAsNumber = customerTel;

    // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
    const existingCustomer = await Customer.findOne({
      where: { customerTel: customerTelAsNumber },
    });
    if (existingCustomer) {
      return response
        .status(400)
        .json({ error: "Phone Number must be unique" });
    }
    // If no errors are found, you can return a success response.
    response.status(200).json({ success: true });
  } catch (error) {
    // Handle specific validation errors
    if (
      error.name === "SequelizeDatabaseError" &&
      error.message.includes("out of range")
    ) {
      response
        .status(400)
        .json({ error: "Phone Number should not exceed 10 characters" });
    } else {
      response
        .status(400)
        .json({ error: "Validation error. Please check your input again!" });
    }
  }
});

app.post("/customers/validateName", async (request, response) => {
  try {
    const { customerName } = request.body;

    // ตรวจสอบว่า customerName ไม่ว่างเปล่า
    if (!customerName || customerName.trim() === "") {
      return response.status(400).json({ error: "Input Name" });
    }

    // ถ้าผ่านทุกเงื่อนไขให้ส่ง response สำเร็จ
    response.status(200).json({ success: true });
  } catch (error) {
    console.error("Error validating customerName:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/customers/validateLastName", async (request, response) => {
  try {
    const { customerLastName } = request.body;

    // ตรวจสอบว่า customerLastName ไม่ว่างเปล่า
    if (!customerLastName || customerLastName.trim() === "") {
      return response.status(400).json({ error: "Input Last Name" });
    }

    // ถ้าผ่านทุกเงื่อนไขให้ส่ง response สำเร็จ
    response.status(200).json({ success: true });
  } catch (error) {
    console.error("Error validating customerLastName:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// READ ID
app.get("/customers/:id", (request, response) => {
  const { id } = request.params;
  console.log("test : ", id);

  Customer.findByPk(parseInt(id)).then((customer) => {
    if (customer) {
      response.json(customer);
    } else {
      response.status(404).json({
        error: "customerTel not found, Please check your input again!",
      });
    }
  });
});

// READ ALL
app.get("/customers", async (request, response) => {
  try {
    const customers = await Customer.findAll();

    // Convert Sequelize instances to plain JavaScript objects
    const customersData = customers.map((customer) => customer.get());

    response.json(customersData);
  } catch (error) {
    console.error("Error fetching customers:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE
app.put("/customers/:id", (request, response) => {
  const { id } = request.params;
  const { customerID, customerName, customerLastName, address, customerTel } =
    request.body;

  // ตรวจสอบความถูกต้องของ customerName และ customerLastName
  if (!customerName || !customerLastName) {
    return response.status(400).json({
      error:
        "customerName and customerLastName are required. Please check your input again!",
    });
  }

  Customer.update(
    {
      customerID,
      customerTel,
      customerName,
      customerLastName,
      address,
    },
    {
      where: {
        customerID: id,
      },
      returning: true,
    }
  ).then((customer) => {
    response.json(customer);
  });
});

// DELETE
app.delete("/customers/:id", (request, response) => {
  const { id } = request.params;

  Customer.findByPk(parseInt(id)).then((customer) => {
    if (!customer) {
      return response.status(404).json({
        error: "customerTel not found, Please check your input again!",
      });
    }
    return Customer.destroy({
      where: {
        customerID: id,
      },
    }).then((customer) => {
      response.json("Deleted : " + customer + "customer!");
    });
  });
});

module.exports = app;
