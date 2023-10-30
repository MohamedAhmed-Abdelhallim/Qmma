const express = require('express')
const campaignMessageListControllers = require('../controllers/campaignMessageListControllers')

const router = express.Router()

router.post('/' , campaignMessageListControllers.create)
router.get('/:campaignMessageListID' , campaignMessageListControllers.find)
router.get('/' , campaignMessageListControllers.findAll)
router.delete('/' , campaignMessageListControllers.remove)

module.exports = router