const { request, response } = require("express");
const express = require("express");
const { Customer } = require("../models");
const app = express.Router();

// CREATE
app.post("/customers", async (request, response) => {
// HEAD
  const { customerTel, customerName, customerLastName, address } = request.body;

  // ตรวจสอบความยาวของ customerTel
  if (customerTel.length > 10) {
      return response.status(400).json({ error: "customerTel should not exceed 10 characters, Please check your input again!" });
  }

  if (customerTel.length < 10) {
    return response.status(400).json({ error: "customerTel should equal to 10 characters, Please check your input again!" });
}

  // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
  const customerTelAsNumber = parseInt(customerTel, 10);
  if (isNaN(customerTelAsNumber)) {
      return response.status(400).json({ error: "customerTel should be a valid number, Please check your input again!" });
  }

  // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
  if (!/^0[689].*/.test(customerTel)) {
      return response.status(400).json({ error: "customerTel should start with '06', '08', or '09', Please check your input again!" });
  }

  // ตรวจสอบความถูกต้องของ customerName
  if (typeof customerName !== 'string' || customerName.trim() === '') {
      return response.status(400).json({ error: "customerName should be a non-empty string, Please check your input again!" });
  }

  if (typeof customerLastName !== 'string' || customerName.trim() === '') {
    return response.status(400).json({ error: "customerLastName should be a non-empty string, Please check your input again!" });
}

  try {
    const { customerTel, customerName, customerLastName, address } = request.body;
    const customerTelAsNumber = parseInt(customerTel, 10);

    // ตรวจสอบความยาวของ customerTel
    if (customerTelAsNumber.length > 9) {
        return response.status(400).json({ error: "customerTel should not exceed 10 characters"});
    }

    if (customerTelAsNumber.length < 9) {
      return response.status(400).json({ error: "customerTel should equal to 10 characters" });
    } 

    // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
    if (isNaN(customerTelAsNumber)) {
        return response.status(400).json({ error: "customerTel should be a valid number" });
    }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
    // if (!/^0[689].*/.test(customerTel)) {
    //     return response.status(400).json({ error: "customerTel should start with '06', '08', or '09'" });
    // }
    // ตรวจสอบความถูกต้องของ customerName
    if (typeof customerName !== 'string' || customerName.trim() === '') {
        return response.status(400).json({ error: "customerName should be a non-empty string" });
    }

    if (typeof customerLastName !== 'string' || customerName.trim() === '') {
      return response.status(400).json({ error: "customerLastName should be a non-empty string" });
    }
      // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
      const existingCustomer = await Customer.findOne({ where: { customerTel: customerTelAsNumber } });
      if (existingCustomer) {
          return response.status(400).json({ error: "customerTel must be unique, Please check your input again!" });
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
          response.status(400).json({ error: "customerTel should not exceed 10 characters"});
      } else {
          response.status(400).json({ error: "Validation error. Please check your input." });
      }
  }
});

app.post("/customers/validateTel", async (request, response) => {
  try {
    const { customerTel } = request.body;
    const customerTelAsNumber = parseInt(customerTel, 10);

    // ตรวจสอบความยาวของ customerTel
    if (customerTelAsNumber.length > 9) {
        return response.status(400).json({ error: "customerTel should not exceed 10 characters"});
    }

    if (customerTelAsNumber.length < 9) {
      return response.status(400).json({ error: "customerTel should equal to 10 characters" });
    } 

    // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
    if (isNaN(customerTelAsNumber)) {
        return response.status(400).json({ error: "customerTel should be a valid number" });
    }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
    // if (!/^0[689].*/.test(customerTel)) {
    //     return response.status(400).json({ error: "customerTel should start with '06', '08', or '09'" });
    // }

    // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
    const existingCustomer = await Customer.findOne({ where: { customerTel: customerTelAsNumber } });
    if (existingCustomer) {
        return response.status(400).json({ error: "customerTel must be unique" });
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
  console.log('test : ', id);

  Customer.findByPk(parseInt(id)).then((customer) => {
      if (customer) {
          response.json(customer);
      } else {
          response.status(404).json({ error: "customerTel not found, Please check your input again!" });
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
app.put("/customers/:id", async (request, response) => {
  const { id } = request.params;
  const { customerTel, customerName, customerLastName, address } = request.body;

  // ตรวจสอบความยาวของ customerTel
  if (customerTel.toString().length !== 9) {
      return response.status(400).json({ error: "customerTel should 9 characters, Please check your input again!" });
  }


  // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
  const customerTelAsNumber = parseInt(customerTel, 10);
  if (isNaN(customerTelAsNumber)) {
      return response.status(400).json({ error: "customerTel should be a valid number, Please check your input again!" });
  }

  // เพิ่มเงื่อนไขเพื่อตรวจสอบความถูกต้องของ customerTel
  if (!/^[689].*/.test(customerTel)) {
      return response.status(400).json({ error: "customerTel should start with '06', '08', or '09', Please check your input again!" });
  }

  // ตรวจสอบความถูกต้องของ customerName
  if (typeof customerName !== 'string' || customerName.trim() === '') {
      return response.status(400).json({ error: "customerName should be a non-empty string, Please check your input again!" });
  }

  if (typeof customerLastName !== 'string' || customerName.trim() === '') {
      return response.status(400).json({ error: "customerLastName should be a non-empty string, Please check your input again!" });
  }

  try {
      // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า customerTel ไม่ซ้ำ
      const existingCustomer = await Customer.findOne({ where: { customerTel: customerTelAsNumber } });
      if (existingCustomer && existingCustomer.id != id) {
          return response.status(400).json({ error: "customerTel must be unique, Please check your input again!" });
      }

      // เพิ่มข้อมูลลงในฐานข้อมูล (เพียงเฉพาะฟิลด์ที่ต้องการอัปเดต)
      const updatedCustomer = await Customer.update({
          customerTel, 
          customerName, 
          customerLastName, 
          address
      }, {
          where: {
              customerTel: id
          },
          returning: true
      });

      response.json(updatedCustomer[1][0]); // Return the updated customer data
  } catch (error) {
      // แก้ไขส่วนนี้เพื่อให้คืนค่า status 400 และข้อความของ validation error
      if (error.name === 'SequelizeDatabaseError' && error.message.includes('out of range')) {
          response.status(400).json({ error: "customerTel should not exceed 10 characters" });
      } else {
          response.status(400).json({ error: "Validation error. Please check your input again!" });
      }
  }
});



// DELETE
app.delete("/customers/:id", (request, response) => {
    const { id } = request.params;

    Customer.findByPk(parseInt(id))
    .then((customer) => {
      if(!customer){
        return response.status(404).json({ error: "customerTel not found, Please check your input again!"});
      }
      return Customer.destroy({
        where: {
          customerTel: id,
        },
      }).then((customer) => {
        response.json("Deleted : " + customer + "customer!");
      });
    });
    })

module.exports = app;