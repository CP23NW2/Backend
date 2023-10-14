const { Sequelize, DataTypes } = require("sequelize"); 
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();

app.use(cors());

module.exports = function Order(){
    class Order extends Sequelize.Model {
        static initialize(sequelize){
            this.sequelize = sequelize

            return this.init({
                orderID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                orderName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                ordered: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                orderStatus: {
                    type: DataTypes.ENUM('Preparing', 'In-Process', 'Complete'),
                    allowNull: false
                },
                dateOfPreparing: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                dateOfProcess: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                dateOfComplete: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                },
                lens: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                detail: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                delivery: {
                    type: DataTypes.ENUM('Pickup', 'Delivery'),
                    allowNull: false
                },
                shipping: {
                    type: DataTypes.ENUM('Flash', 'EMS', 'J&T'),
                    allowNull: true
                },
                tracking: {
                    type: DataTypes.INTEGER(15),
                    allowNull: true
                }
            },
            {
                sequelize, // Associate the model with the Sequelize instance
                modelName: 'Order', // Optional: Specify the model name
                tableName: 'orders' // Optional: Specify the table name
            })
        }
    }
    return Order;
}