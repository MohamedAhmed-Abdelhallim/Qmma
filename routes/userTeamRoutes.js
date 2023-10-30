const express = require('express')
const userTeamControllers = require('../controllers/userTeamControllers')

const router = express.Router()

router.post('/' , userTeamControllers.create)
router.get('/:userteamid' , userTeamControllers.find)
router.get('/' , userTeamControllers.findAll)
router.delete('/' , userTeamControllers.remove)

module.exports = router