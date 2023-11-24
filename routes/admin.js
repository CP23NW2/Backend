const { request, response } = require("express");
const express = require("express");
const { Admin } = require("../models");
const app = express.Router();

// CREATE
app.post("/admins", (request,response) => {
    const {adminTel, adminName, password} = request.body;
    Admin.create({
        adminTel, 
        adminName, 
        password
    }).then((admin) => {
        response.json(admin);
    })
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
  
module.exports = app;