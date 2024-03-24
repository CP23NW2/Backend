const { Sequelize, DataTypes } = require("sequelize");
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();
const customers = require("./customers");
app.use(cors());

module.exports = function Admin() {
    class Admin extends Sequelize.Model {
        static initialize(sequelize) {
            this.sequelize = sequelize

            return this.init({
                adminID:{
                    type: DataTypes.BIGINT(10),
                    primaryKey: true
                },
                adminTel: {
                    type: DataTypes.STRING,
                    length: 10,
                    unsigned: true,
                    zerofill: true,
                },
                adminName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING(16),
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true // Validate the email format
                    }
                },
                otp: {
                   type: DataTypes.INTEGER,
                   allowNull: true
                }
            },
                {
                    sequelize, // Associate the model with the Sequelize instance
                    modelName: 'Admin', // Optional: Specify the model name
                    tableName: 'admins' // Optional: Specify the table name
                })
        }
    }
    return Admin;
}