const express = require('express')
const userSkillControllers = require('../controllers/userSkillController')

const router = express.Router()

router.post('/' , userSkillControllers.create)
router.get('/:userSkillID' , userSkillControllers.find)
router.get('/' , userSkillControllers.findAll)
router.delete('/' , userSkillControllers.remove)

module.exports = router