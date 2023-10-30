const express = require('express')
const campaignTemplateVarControllers = require('../controllers/campaignTemplateVarsControllers')

const router = express.Router()

router.post('/' , campaignTemplateVarControllers.create)
router.get('/:campaignTemplateVarID' , campaignTemplateVarControllers.find)
router.get('/' , campaignTemplateVarControllers.findAll)
router.delete('/' , campaignTemplateVarControllers.remove)

module.exports = router