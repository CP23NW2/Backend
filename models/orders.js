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
                    type: DataTypes.BIGINT(10),
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
                    type: DataTypes.STRING(10),
                    allowNull: true
                },
                tracking: {
                    type: DataTypes.STRING(15),
                    allowNull: true
                },
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
                foreignKey: 'customerID',
                reference: {model: 'Customer', Key: 'customerID'}
            }) //คสพแบบ 1:M

            Order.hasMany(models.Eyewear, {
                foreignKey: 'orderID',
                reference: {model: 'Eyewear', Key: 'orderID'}
            })
        }
    }
    return Order;
}