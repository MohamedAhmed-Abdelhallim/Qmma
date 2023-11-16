const express = require('express')
const channelControllers = require('../controllers/channelControllers')

const router = express.Router()

router.get('/' , channelControllers.findAll)
router.delete('/' , channelControllers.remove)

module.exports = router