const express = require('express');
const router = express.Router();

const eyewear = require('./eyewears')
const admin = require('./admin')
const customer= require('./customers')
const order = require('./order')

router.use(admin);
router.use(eyewear);
router.use(customer);
router.use(order);

module.exports = router;