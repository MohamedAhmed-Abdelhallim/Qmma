const express = require('express')
const templateVarsControllers = require('../controllers/templateVarsControllers')

const router = express.Router()

router.post('/' , templateVarsControllers.create)
 router.get('/:templateVarsID' , templateVarsControllers.find)
router.get('/' , templateVarsControllers.findAll)
router.delete('/' , templateVarsControllers.remove)

module.exports = router