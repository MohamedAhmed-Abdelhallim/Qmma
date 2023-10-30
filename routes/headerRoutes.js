const express = require('express')
const headerControllers = require('../controllers/HeaderControllers')

const router = express.Router()

router.post('/' , headerControllers.create)
router.get('/:headerID' , headerControllers.find)
router.get('/' , headerControllers.findAll)
router.delete('/' , headerControllers.remove)

module.exports = router