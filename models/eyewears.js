const { Sequelize, DataTypes } = require("sequelize"); 
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();

app.use(cors());

module.exports = function Eyewear(){
    class Eyewear extends Sequelize.Model {
        static initialize(sequelize){
            this.sequelize = sequelize

            return this.init({
                eyewearID: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                eyewearName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                orderStatus: {
                    type: DataTypes.ENUM('Preparing', 'Processing', 'Complete'),
                    allowNull: false
                },
                datePreparing: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                dateProcessing: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                dateComplete: {
                    type: DataTypes.DATE,
                    allowNull: true
                },
                lens: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                detail: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                price: {
                    type: DataTypes.FLOAT,
                    allowNull: true
                },
                leftSPH: {
                    type: DataTypes.STRING(6),
                },
                leftCYL: {
                    type: DataTypes.STRING(6),
                },
                leftAXIS: {
                    type: DataTypes.STRING(6),
                },
                leftADD: {
                    type: DataTypes.STRING(6),
                },
                leftPD: {
                    type: DataTypes.STRING(6),
                },
                leftSH: {
                    type: DataTypes.STRING(6),
                },
                leftUpKT: {
                    type: DataTypes.STRING(6),
                },
                rightSPH: {
                    type: DataTypes.STRING(6),
                },
                rightCYL: {
                    type: DataTypes.STRING(6),
                },
                rightAXIS: {
                    type: DataTypes.STRING(6),
                },
                rightADD: {
                    type: DataTypes.STRING(6),
                },
                rightPD: {
                    type: DataTypes.STRING(6),
                },
                rightSH: {
                    type: DataTypes.STRING(6),
                },
                rightUpKT: {
                    type: DataTypes.STRING(6),
                }
            },
            {
                sequelize, // Associate the model with the Sequelize instance
                modelName: 'Eyewear', // Optional: Specify the model name
                tableName: 'eyewears' // Optional: Specify the table name
            })
        }
        static associate(models){
            Eyewear.models = models;

            Eyewear.belongsTo(models.Order, {
                foreignKey: 'orderID',
                references: { model: 'Order', key: 'orderID'}
            })
        }
        
    }
    return Eyewear;
}