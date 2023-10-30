const express = require('express')
const subMenuControllers = require('../controllers/subMenuControllers')

const router = express.Router()

router.post('/' , subMenuControllers.create)
router.get('/:subMenuid' , subMenuControllers.find)
router.get('/' , subMenuControllers.findAll)
router.delete('/' , subMenuControllers.remove)

module.exports = router