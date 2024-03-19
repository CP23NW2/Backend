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
    return response.status(400).json({ error: 'Invalid Request' })
  }

  if (orderID.length === 0 || lastFourDigits.length === 0) {
    return response.status(400).json({ error: 'Invalid Request' })
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
      return response.status(404).json({ error: 'Customer Not Found' })
    }

    const order = await Order.findOne({
      include: [
        {
          model: Eyewear
        }
      ],
      where: { orderID },
    })

    console.log(order)
    return response.status(200).json(order)

    // Order.findOne({
    //   where: { orderID },
    //   include: [
    //     {
    //       model: Customer,
    //     }
    //   ]
    // }).then((order) => {
    //   if (order === null) {
    //     return response.status(404).json({ error: 'Order Not Found' })
    //   }
    //    return response.status(200).json(order)
    // })
  } catch (error) {
    console.error('Error Validation:', error)
    response.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = app
