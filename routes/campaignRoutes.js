const express = require('express')
const campaignControllers = require('../controllers/campaignControllers')

const router = express.Router()

router.post('/' , campaignControllers.create)
router.get('/:campaignID' , campaignControllers.find)
router.get('/' , campaignControllers.findAll)
router.delete('/' , campaignControllers.remove)

module.exports = router