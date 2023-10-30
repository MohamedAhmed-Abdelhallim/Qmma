const express = require('express')
const roleControllers = require('../controllers/roleControllers')

const router = express.Router()

router.post('/' , roleControllers.create)
router.get('/:roleid' , roleControllers.find)
router.get('/' , roleControllers.findAll)
router.delete('/' , roleControllers.remove)

module.exports = router