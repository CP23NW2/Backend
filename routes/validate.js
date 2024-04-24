const { request, response } = require('express')
const express = require('express')
const { Order, Eyewear, Customer } = require('../models')
const { Op } = require('sequelize')

const app = express.Router()
const { v4: uuidv4 } = require('uuid')
const e = require('express')

app.post('/validate', async (request, response) => {
  let { orderID, lastFourDigits } = request.body

  if (!orderID || !lastFourDigits) {
    return response.status(400).json({ error: 'Please input OrderID and Last 4 Phone Number digits' })
  }

  if (orderID.length === 0 || lastFourDigits.length === 0) {
    return response.status(400).json({ error: 'Please input OrderID and Last 4 Phone Number digits' })
  }

  try {
    const customer = await Customer.findOne({
      where: {
        customerTel: {
          [Op.like]: `%${lastFourDigits}`
        }
      }
    })

    if (!customer) {
      return response.status(404).json({ error: 'Order and Customer Not Found' })
    }

    const order = await Order.findOne({
      include: [
        {
          model: Eyewear
        }
      ],
      where: { orderID },
    })
    return response.status(200).json(order)
  } catch (error) {
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = app
