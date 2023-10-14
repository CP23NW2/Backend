const { Sequelize, DataTypes } = require("sequelize"); 
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();

app.use(cors());

module.exports = function EyeSight(){
    class EyeSight extends Sequelize.Model {
        static initialize(sequelize){
            this.sequelize = sequelize

            return this.init({
                eyeSightId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                eyeSightName: {
                    type: DataTypes.STRING,
                    allowNull: false
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
                modelName: 'EyeSight', // Optional: Specify the model name
                tableName: 'eyeSights' // Optional: Specify the table name
            })
        }
    }
    return EyeSight;
}