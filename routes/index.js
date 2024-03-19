const express = require('express');
const router = express.Router();

const eyewear = require('./eyewears')
const admin = require('./admin')
const customer= require('./customers')
const order = require('./order')
const validate = require('./validate')

router.use(admin);
router.use(eyewear);                           
router.use(customer);
router.use(order);
router.use(validate);

module.exports = router;