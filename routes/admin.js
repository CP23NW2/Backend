const { request, response } = require("express");
const express = require("express");
const { Admin } = require("../models");
const app = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// function  
   // Function to generate a unique admin ID
   function generateAdminID() {
    let randomID = '';
    for (let i = 0; i < 13; i++) {
        randomID += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9 and concatenate them together
    }
    return randomID;
}
    //  validate email
    function validateEmail(email) {
      // Regular expression for validating email addresses
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    //validate spacebar
    function hasNonSpaceCharacters(inputString) {
      // Define a regular expression to match any character that is not a space
      const nonSpaceRegex = /\S/;
  
      // Test if the input string contains non-space characters
      return nonSpaceRegex.test(inputString);
    }

    // validate password includ upercase, lowercase, number 
    function validatePassword(password) {
      // Regular expressions to check for uppercase, lowercase, and numeric characters
      const uppercaseRegex = /[A-Z]/;
      const lowercaseRegex = /[a-z]/;
      const numberRegex = /[0-9]/;
  
      // Check if the password meets all the criteria
      const hasUppercase = uppercaseRegex.test(password);
      const hasLowercase = lowercaseRegex.test(password);
      const hasNumber = numberRegex.test(password);
  
      // Password length should be at least 8 characters
      const isLengthValid = password.length >= 8;
  
      // Return true if all criteria are met, otherwise return false
      return hasUppercase && hasLowercase && hasNumber && isLengthValid;
  }
  
  // Generate verification code (you can use any method you prefer)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
// CREATE
app.post("/admins", async (request, response) => {
    const { adminTel, adminName, password, email } = request.body;

    if (!/^0[689].*/.test(adminTel)) {
      return response.status(400).json({
        error:
          "Phone Number should start with '06', '08', or '09', Please check your input again!",
      });
    }

     // Validate email
     if (!validateEmail(email)) {
      return response.status(400).json({
          error: "Invalid email address, please check your input again!",
      });
    }
  
    // Validate password 
    if (!validatePassword(password)){
      return response.status(400).json({
        error: "Password must include Uppercase, Lowercase and Number"
      })
    }

    // Create a new admin with the generated adminID
    try {
      const { adminTel, adminName, email, password } = request.body;
      const adminID = generateAdminID();
      const adminTelAsNumber = adminTel;
      const hashedPassword = await bcrypt.hash(password, 10)

      let isDuplicate = await Admin.findOne({ where: { adminID } });
      while (isDuplicate) {
        // ถ้า customerID ซ้ำกับอันอื่น สร้าง customerID ใหม่
        adminID = generateAdminID();
        isDuplicate = await Admin.findOne({ where: { adminID } });
      }
      
      // Check for duplicate email
    const isDuplicateEmail = await Admin.findOne({ where: { email } });
    if (isDuplicateEmail) {
      return response.status(400).json({
        error: "Email already exists, please use a different email address!",
      });
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
        email,
        password: hashedPassword
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
// app.delete("/admins/:id", (request, response) => {
//     const { id } = request.params;
//     Admin.destroy({
//       where: {
//         adminID: id,
//       },
//     }).then((admin) => {
//       response.json(admin);
//     });
//   });

  app.delete("/admins/:id", (request, response) => {
    const { id } = request.params;
    Admin.findOne({
      where: {
        adminID: id,
      },
    }).then((order) => {
      if (!order) {
        // ไม่พบคำสั่ง
        return response.status(404).json({ error: "Admin not found" });
      }
      // ลบคำสั่งสำเร็จ
      Admin.destroy({
        where: {
          adminID: id,
        },
      }).then(() => {
        response.json("Delete Admin Succsess!");
      }).catch(error => {
        // การประมวลผลเกิดข้อผิดพลาด
        response.status(500).json({ error: "Internal Server Error" });
      });
    }).catch(error => {
      // การประมวลผลเกิดข้อผิดพลาด
      response.status(500).json({ error: "Internal Server Error" });
    });
  });

// Function to generate a random OTP
function generateOTP() {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

// Function to send OTP via email
async function sendOTPByEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'buddyglassesofficial@gmail.com',
      pass: 'gpmv wmkr lvmr nbvi'
    }
  });

  const mailOptions = {
    from: 'buddyglassesofficial@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `
    <html>
      <head>
        <style>
          /* CSS styles */
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            color: #333333;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #ff6600;
            color: #ffffff;
            padding: 10px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .content {
            padding: 20px;
          }
          .otp {
            font-size: 20px;
            font-weight: bold;
            color: #ff6600;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Email Verification</h2>
          </div>
          <div class="content">
            <p>Dear User,</p>
            <p>Please use the following OTP to verify your email address:</p>
            <p class="otp">${otp}</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>Thank you,<br/>Buddy Glasses Team</p>
          </div>
        </div>
      </body>
    </html>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully!');
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Error sending OTP');
  }
}

app.post('/admins/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });

    // If admin is not found, return error
    if (!admin) {
      return res.status(401).json({
        message: "Login not successful",
        error: "Email or Password incorrect",
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    // If passwords don't match, return error
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Login not successful",
        error: "Email or Password incorrect",
      });
    }

    // Passwords match, generate and save OTP
    const otp = generateOTP();
    admin.otp = otp;
    await admin.save();
    // Send OTP to email
    await sendOTPByEmail(email, otp);

    // Login successful, send success message
    return res.status(200).json({ message: 'Login successful. OTP sent to your email.' });
  } catch (error) {
    // Handle errors
    console.error("Error during login:", error);
    return res.status(500).json({ error: 'Failed to process login request.', errorMessage: error.message });
  }
});
app.post('/admins/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    // ค้นหาผู้ดูแลระบบโดยใช้ email
    const admin = await Admin.findOne({ where: { email } });

    // ถ้าไม่พบผู้ดูแลระบบ หรือ OTP ที่ใส่ไม่ตรงกับที่สร้างขึ้นมา
    if (!admin || admin.otp !== otp) { // แทน '123456' ด้วย OTP ที่สร้างขึ้น
      console.log('OTP verification failed')
      return res.status(401).json({
        message: "OTP verification failed",
        error: "Invalid OTP",
      });
    }

     // If admin is found and password is correct, generate a token
     const token = jwt.sign({ email: admin.email, id: admin.adminID }, 'secret', { expiresIn: '1h' });

    // ถ้า OTP ถูกต้อง
    // ส่งข้อความสำเร็จหากไม่มีข้อผิดพลาด
    return res.status(200).json({ message: 'OTP verification successful. You are now logged in.', token });
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการค้นหาหรือตรวจสอบ OTP
    // ส่งข้อความข้อผิดพลาด
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ error: 'Failed to process OTP verification request.', errorMessage: error.message });
  }
});
module.exports = app;