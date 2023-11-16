const express = require('express')
const companyControllers = require('../controllers/companyControllers')
const router= express.Router()

router.post('/' , companyControllers.create)
router.get('/1' , companyControllers.find)
router.get('/' , companyControllers.findAll)
router.delete('/' , companyControllers.remove)

module.exports = router