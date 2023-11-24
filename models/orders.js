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
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: false
                },
                dateOrder: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                delivery: {
                    type: DataTypes.ENUM('Pickup', 'Delivery'),
                    allowNull: false
                },
                shippingName: {
                    type: DataTypes.ENUM('Flash', 'EMS', 'J&T'),
                    allowNull: true
                },
                tracking: {
                    type: DataTypes.STRING(15),
                    allowNull: true
                }
            },
            {
                sequelize, // Associate the model with the Sequelize instance
                modelName: 'Order', // Optional: Specify the model name
                tableName: 'orders' // Optional: Specify the table name
            })
        }
        static associate(models){
            Order.models = models
          
            Order.belongsTo(models.Customer, {
                foreignKey: 'customerTel',
                reference: {model: 'Customer', Key: 'customerTel'}
            }) //คสพแบบ 1:M
        }
    }
    return Order;
}