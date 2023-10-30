const express = require('express')
const lookUpDataControllers = require('../controllers/lookUpDataControllers')
const router = express.Router()

router.post('/' , lookUpDataControllers.create)
router.get('/:lookupdataID' , lookUpDataControllers.find)
router.get('/' , lookUpDataControllers.findAll)
router.delete('/:lookupdataID' , lookUpDataControllers.remove)


module.exports = router