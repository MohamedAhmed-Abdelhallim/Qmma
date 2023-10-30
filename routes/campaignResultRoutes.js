const express = require('express')
const campaignResultControllers = require('../controllers/campaignResultControllers')

const router = express.Router()

router.post('/' , campaignResultControllers.create)
router.get('/:campaignResultID' , campaignResultControllers.find)
router.get('/' , campaignResultControllers.findAll)
router.delete('/' , campaignResultControllers.remove)

module.exports = router