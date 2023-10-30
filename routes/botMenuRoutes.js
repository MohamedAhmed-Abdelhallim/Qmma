const express = require('express')
const botMenuControllers = require('../controllers/BotMenuControllers')

const router = express.Router()

router.post('/' , botMenuControllers.create)
router.get('/:botMenuid' , botMenuControllers.find)
router.get('/' , botMenuControllers.findAll)
router.delete('/' , botMenuControllers.remove)


module.exports = router