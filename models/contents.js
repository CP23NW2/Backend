const { Sequelize, DataTypes } = require("sequelize"); 
const cors = require('cors');
const express = require('express')
const { request, response } = require("express");
const app = express();

app.use(cors());

module.exports = function Content(){
    class Content extends Sequelize.Model {
        static initialize(sequelize){
            this.sequelize = sequelize

            return this.init({
                contentId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                contentName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                detail: {
                    type: DataTypes.TEXT,
                },
                sinceDate: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                untilDate: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                picture: {
                    type: DataTypes.TEXT,
                }
            },
            {
                sequelize, // Associate the model with the Sequelize instance
                modelName: 'Content', // Optional: Specify the model name
                tableName: 'contents' // Optional: Specify the table name
            })
        }
    }
    return Content;
}