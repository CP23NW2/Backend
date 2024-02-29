const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");
const express = require("express");
const { request, response } = require("express");
const orders = require("./orders");
const app = express();

app.use(cors());

module.exports = function Customer() {
  class Customer extends Sequelize.Model {
    static initialize(sequelize) {
      this.sequelize = sequelize;

      return this.init(
        {
          customerID: {
            type: DataTypes.BIGINT(10),
            autoIncrement: true,
            primaryKey: true,
          },
          customerTel: {
            type: DataTypes.STRING(10),
            length: 10,
            unsigned: true,
            zerofill: true,
          },
          customerName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          customerLastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          address: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        },
        {
          sequelize, // Associate the model with the Sequelize instance
          modelName: "Customer", // Optional: Specify the model name
          tableName: "customers", // Optional: Specify the table name
        }
      );
    }
    static associate(models) {
      Customer.models = models;

      Customer.belongsTo(models.Admin, {
        foreignKey: "adminID",
        references: { model: "Admin", key: "adminID" },
      });
    }
  }
  return Customer;
};
