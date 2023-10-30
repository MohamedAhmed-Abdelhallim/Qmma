const express = require('express')
const templateControllers = require('../controllers/templateControllers')

const router = express.Router()

router.post('/' , templateControllers.create)
router.get('/:templateID' , templateControllers.find)
router.get('/' , templateControllers.findAll)
router.delete('/' , templateControllers.remove)

module.exports = router