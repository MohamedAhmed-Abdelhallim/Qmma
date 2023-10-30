const express = require('express')
const workspaceControllers = require('../controllers/workspaceControllers')

const router = express.Router()


router.post('/' , workspaceControllers.create)
router.get('/:workspaceID' , workspaceControllers.find)
router.get('/',workspaceControllers.findAll)
router.delete('/' , workspaceControllers.remove)

module.exports = router