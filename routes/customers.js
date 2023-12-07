const { request, response } = require("express");
const express = require("express");
const { Customer } = require("../models");
const app = express.Router();

// CREATE
app.post("/customers", async (request, response) => {
  const { customerTel, customerName, customerLastName, address } = request.body;

  // ตรวจสอบความยาวของ customerTel
  if (customerTel.length > 10) {
      return response.status(400).json({ error: "customerTel should not exceed 10 characters" });
  }

  if (customerTel.length < 10) {
    return response.status(400).json({ error: "customerTel should equal to 10 characters" });
}

  // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
  const customerTelAsNumber = parseInt(customerTel, 10);
  if (isNaN(customerTelAsNumber)) {
      return response.status(400).json({ error: "customerTel should be a valid number" });
  }

  // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
  if (!/^0[689].*/.test(customerTel)) {
      return response.status(400).json({ error: "customerTel should start with '06', '08', or '09'" });
  }

  // ตรวจสอบความถูกต้องของ customerName
  if (typeof customerName !== 'string' || customerName.trim() === '') {
      return response.status(400).json({ error: "customerName should be a non-empty string" });
  }

  if (typeof customerLastName !== 'string' || customerName.trim() === '') {
    return response.status(400).json({ error: "customerLastName should be a non-empty string" });
}

  try {
      // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
      const existingCustomer = await Customer.findOne({ where: { customerTel: customerTelAsNumber } });
      if (existingCustomer) {
          return response.status(400).json({ error: "customerTel must be unique" });
      }

      // เพิ่มข้อมูลลงในฐานข้อมูล
      const newCustomer = await Customer.create({
          customerTel: customerTelAsNumber, // หรือให้ customerTel เป็น string ขึ้นอยู่กับการตั้งค่าของฐานข้อมูล
          customerName,
          customerLastName,
          address
      });

      response.json(newCustomer);
  } catch (error) {
      // แก้ไขส่วนนี้เพื่อให้คืนค่า status 400 และข้อความของ validation error
      if (error.name === 'SequelizeDatabaseError' && error.message.includes('out of range')) {
          response.status(400).json({ error: "customerTel should not exceed 10 characters" });
      } else {
          response.status(400).json({ error: "Validation error. Please check your input." });
      }
  }
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