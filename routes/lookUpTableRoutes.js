const express = require('express')
const lookUpTableControllers = require('../controllers/lookUpTableControllers')

const router = express.Router()

router.post('/' , lookUpTableControllers.create)
router.get('/:lookuptableID' , lookUpTableControllers.find)
router.get('/' , lookUpTableControllers.findAll)
router.delete('/:lookuptableID' , lookUpTableControllers.remove)

module.exports = router