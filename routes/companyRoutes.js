const express = require('express')
const companyControllers = require('../controllers/companyControllers')
const router= express.Router()

router.post('/' , companyControllers.create)
router.get('/:companyID' , companyControllers.find)
router.get('/' , companyControllers.findAll)
router.delete('/:companyID' , companyControllers.remove)

module.exports = router