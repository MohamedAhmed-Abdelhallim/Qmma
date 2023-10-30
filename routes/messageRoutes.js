const express = require('express')
const messageControllers = require('../controllers/messageControllers')

const router = express.Router()

router.post('/' , messageControllers.create)
router.get('/:messageID' , messageControllers.find)
router.get('/' , messageControllers.findAll)
router.delete('/' , messageControllers.remove)

module.exports = router