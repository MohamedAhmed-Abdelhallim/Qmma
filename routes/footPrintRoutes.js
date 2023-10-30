const express = require('express')
const footPrintControllers = require('../controllers/footPrintControllers')

const router = express.Router()

router.post('/' , footPrintControllers.create)
router.get('/:footPrintid' , footPrintControllers.find)
router.get('/' , footPrintControllers.findAll)
router.delete('/' , footPrintControllers.remove)

module.exports = router