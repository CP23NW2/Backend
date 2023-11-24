const { Sequelize, DataTypes } = require("sequelize"); 
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();
const customers = require("./customers");
app.use(cors());

module.exports = function Admin(){
    class Admin extends Sequelize.Model {
        static initialize(sequelize){
            this.sequelize = sequelize

            return this.init({
                adminTel: {
                    type: DataTypes.INTEGER(10),
                    primaryKey: true,
                },
                adminName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                password: {
                    type: DataTypes.STRING(16),
                    allowNull: false
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