const express = require('express')
const botMessageControllers = require('../controllers/BotMessageControllers')

const router = express.Router()

router.post('/' , botMessageControllers.create)
router.get('/:botMessageID' , botMessageControllers.find)
router.get('/' , botMessageControllers.findAll)
router.delete('/' , botMessageControllers.remove)

module.exports = router