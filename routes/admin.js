const { request, response } = require("express");
const express = require("express");
const { Admin } = require("../models");
const app = express.Router();
const bcrypt = require('bcrypt');


// CREATE
app.post("/admins", async (request, response) => {
    const { adminTel, adminName, password } = request.body;

    // Function to generate a unique admin ID
    function generateAdminID() {
        let randomID = '';
        for (let i = 0; i < 13; i++) {
            randomID += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9 and concatenate them together
        }
        return randomID;
    }

    if (!/^0[689].*/.test(adminTel)) {
      return response.status(400).json({
        error:
          "Phone Number should start with '06', '08', or '09', Please check your input again!",
      });
    }

    //validate spacebar
  function hasNonSpaceCharacters(inputString) {
    // Define a regular expression to match any character that is not a space
    const nonSpaceRegex = /\S/;

    // Test if the input string contains non-space characters
    return nonSpaceRegex.test(inputString);
  }

    // Create a new admin with the generated adminID
    try {
      const { adminTel, adminName, password } = request.body;
      const adminID = generateAdminID();
      const adminTelAsNumber = adminTel;
      
      let isDuplicate = await Admin.findOne({ where: { adminID } });
      while (isDuplicate) {
        // ถ้า customerID ซ้ำกับอันอื่น สร้าง customerID ใหม่
        adminID = generateAdminID();
        isDuplicate = await Admin.findOne({ where: { adminID } });
      }
      
      // ตรวจสอบความถูกต้องของ customerTel และชนิดข้อมูลในฐานข้อมูล
    if (isNaN(adminTelAsNumber)) {
      return response
        .status(400)
        .json({ error: "Phone Number should be a valid number" });
    }

    // ตรวจสอบความยาวของ customerTel
    if (adminTelAsNumber.toString().length !== 10) {
      return response
        .status(400)
        .json({ error: "Phone Number should equal to 10 characters" });
    }

    if(password.toString().length > 16) {
      return response
        .status(400)
        .json({ error: "Password less than or equa 16" });
    }

    if(!hasNonSpaceCharacters(password.toString())) {
      return response
        .status(400)
        .json({ error: "password can't input spacebar" });
    }

    if (!adminName || adminName.trim() === '') {
      return response.status(400).json({ error: "Name must not be blank" });
    }

    if(!hasNonSpaceCharacters(adminName.toString())) {
      return response
        .status(400)
        .json({ error: "Admin Name can't input spacebar" });
    }

      const newAdmin = await Admin.create({
        adminID, 
        adminTel: adminTelAsNumber, 
        adminName, 
        password
      })
        response.json(newAdmin);
    } catch (error) {
        console.error("Error creating admin:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});


// READ ID
app.get("/admins/:id", (request, response) => {
    const { id } = request.params;
    console.log('test : ', id);
    Admin.findByPk(parseInt(id)).then((admin) => {
      if (admin) {
        response.json(admin);
      } else {
        response.sendStatus(404);
      }
    });
  });

// READ ALL 
app.get("/admins", (request, response) => {
    Admin.findAll().then((admin) => {
        response.json(admin);
    });
  });

// UPDATE
app.put("/admins/:id", (request, response) => {
    const { id } = request.params;
    const { adminTel, adminName, password } = request.body;
    Admin.update({
        adminTel, 
        adminName, 
        password
    }, {
      where: {
          adminTel: id
      },
      returning: true
    }).then((admin) => {
      response.json(admin);
    });
  });

// DELETE
app.delete("/admins/:id", (request, response) => {
    const { id } = request.params;
    Admin.destroy({
      where: {
        adminTel: id,
      },
    }).then((admin) => {
      response.json(admin);
    });
  });

//login
app.post('/admins/login', async (req, res) => {
  const { adminID, password } = req.body;
  try {
    // Find admin based on adminID
    const admin = await Admin.findOne({ where: { adminID, password } });
    if (!admin) {
      res.status(401).json({
        message: "Login not successful",
        error: "adminID or password incorrect",
      })
    } else {
      res.status(200).json({
        message: "Login successful",
        admin,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
});
    
module.exports = app;