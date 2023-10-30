const express = require('express')
const skillControllers = require('../controllers/skillControllers')

const router = express.Router()

router.post('/' , skillControllers.create)
router.get('/:skillID' , skillControllers.find)
router.get('/' , skillControllers.findAll)
router.delete('/' , skillControllers.remove)

module.exports = router