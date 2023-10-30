const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

router.post('/' , userControllers.create)
router.post('/createAdmin' , userControllers.createAdmin)
router.get('/login' , userControllers.login)
router.get('/:userID' , userControllers.find)
router.get('/' , userControllers.findAll)
router.delete('/' , userControllers.remove)

module.exports = router