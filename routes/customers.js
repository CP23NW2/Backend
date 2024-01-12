const { request, response } = require("express");
const express = require("express");
const { Customer } = require("../models");
const app = express.Router();

// CREATE
app.post("/customers", async (request, response) => {
  const { customerID, customerTel, customerName, customerLastName, address } =
    request.body;

    //validate spacebar
    function hasNonSpaceCharacters(inputString) {
      // Define a regular expression to match any character that is not a space
      const nonSpaceRegex = /\S/;
    
      // Test if the input string contains non-space characters
      return nonSpaceRegex.test(inputString);
    }

  //Sorting CusotmerID by DESC
  const lastCustomerID = await Customer.findOne({
    order: [["customerID", "DESC"]],
  });

  // Generate the next customerID
  const nextCustomerID = lastCustomerID
    ? incrementCustomerID(lastCustomerID.customerID)
    : generateInitialCustomerID();

  // Check for duplicates
  const isDuplicate = await Customer.findOne({
    where: { customerID: nextCustomerID },
  });

  if (isDuplicate) {
    // Handle duplicate case (you may want to retry or return an error)
    response
      .status(500)
      .json({ error: "Failed to generate a unique customerID" });
  }
  // Function to increment the customerID
  function incrementCustomerID(lastCustomerID) {
    const numericID = parseInt(lastCustomerID, 10);
    return (numericID + 1).toString();
  }

  // Function to generate an initial customerID if no records exist
  function generateInitialCustomerID() {
    return "1"; // or any starting value you prefer
  }

  if (!/^0[689].*/.test(customerTel)) {
    return response.status(400).json({ error: "customerTel should start with '06', '08', or '09', Please check your input again!" });
}
  try {
    const { customerID, customerTel, customerName, customerLastName, address } =
      request.body;
    const customerTelAsNumber = customerTel;

    // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
    if (isNaN(customerTelAsNumber)) {
      return response
        .status(400)
        .json({ error: "customerTel should be a valid number" });
    }

    // ตรวจสอบความยาวของ customerTel
    if (customerTel.toString().length !== 10) {
      return response
        .status(400)
        .json({ error: "customerTel should equal to 10 characters" });
    }
    
    if (!hasNonSpaceCharacters(customerTel.toString())) {
      return response.status(400).json({ error: "customerTel should not be spacebar" });
    }    

    // ตรวจสอบความถูกต้องของ customerName
    if (typeof customerName !== "string" || customerName.trim() === "") {
      return response
        .status(400)
        .json({ error: "customerName should be a non-empty string" });
    }

    if (
      typeof customerLastName !== "string" ||
      customerLastName.trim() === ""
    ) {
      return response
        .status(400)
        .json({ error: "customerLastName should be a non-empty string" });
    }
    // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
    const existingCustomer = await Customer.findOne({
      where: { customerTel: customerTelAsNumber },
    });
    if (existingCustomer) {
      return response.status(400).json({
        error: "customerTel must be unique, Please check your input again!",
      });
    }

    // เพิ่มข้อมูลลงในฐานข้อมูล
    const newCustomer = await Customer.create({
      customerID: nextCustomerID,
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
      //validate spacebar
      function hasNonSpaceCharacters(inputString) {
        // Define a regular expression to match any character that is not a space
        const nonSpaceRegex = /\S/;
      
        // Test if the input string contains non-space characters
        return nonSpaceRegex.test(inputString);
      }
  try {
    const { customerTel } = request.body;
    const customerTelAsNumber = parseInt(customerTel, 10);

    if (isNaN(customerTelAsNumber)) {
      return response
        .status(400)
        .json({ error: "customerTel should be a valid number" });
    }

    // ตรวจสอบความยาวของ customerTel
    if (customerTel.toString().length !== 10) {
      return response
        .status(400)
        .json({ error: "customerTel should equal to 10 characters" });
    }
    
    if (customerTel.toString() !== hasNonSpaceCharacters){
      return response
        .status(400)
        .json({ error: "customerTel should not be spacebar" });
    }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
    // if (!/^0[689].*/.test(customerTel)) {
    //     return response.status(400).json({ error: "customerTel should start with '06', '08', or '09'" });
    // }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
    const existingCustomer = await Customer.findOne({ where: { customerTel: customerTelAsNumber } });
    if (existingCustomer) {
        return response.status(400).json({ error: "customerTel must be unique " });
    }

  } catch (error) {
      // แก้ไขส่วนนี้เพื่อให้คืนค่า status 400 และข้อความของ validation error
      if (error.name === 'SequelizeDatabaseError' && error.message.includes('out of range')) {
          response.status(400).json({ error: "customerTel should not exceed 10 characters"});
      } else {
          response.status(400).json({ error: "Validation error. Please check your input again!" });
      }
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
  const { customerID, customerName, customerLastName, address, customerTel } = request.body;

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
