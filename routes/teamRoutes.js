const express = require('express')
const teamControllers = require('../controllers/teamControllers')

const router = express.Router()

router.post('/' , teamControllers.create)
router.get('/:teamID' , teamControllers.find)
router.get('/' , teamControllers.findAll)
router.delete('/' , teamControllers.remove)

module.exports = router