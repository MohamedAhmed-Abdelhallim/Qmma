const express = require('express')
const botControllers = require('../controllers/botControllers')

const router = express.Router()

router.post('/' , botControllers.create)
router.get('/:botid' , botControllers.find)
router.get('/' , botControllers.findAll)
router.delete('/' , botControllers.remove)

module.exports = router
