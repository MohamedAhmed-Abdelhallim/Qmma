const express = require('express')
const templateButtonControllers = require('../controllers/templateButtonControllers')

const router = express.Router()

router.post('/' , templateButtonControllers.create)
router.get('/:templateButtonID' , templateButtonControllers.find)
router.get('/' , templateButtonControllers.findAll)
router.delete('/' , templateButtonControllers.remove)

module.exports = router