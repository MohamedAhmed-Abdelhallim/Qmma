const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

router.post('/addChannel' , userControllers.addChannel)
router.get('/getChannels' , userControllers.getChannels)
router.delete('/deleteChannel' , userControllers.removeChannel)
router.put('/channel' , userControllers.updateChannel)
router.post('/' , userControllers.create)
router.post('/createAdmin' , userControllers.createAdmin)
router.post('/login' , userControllers.login)
router.get('/:userID' , userControllers.find)
router.get('/' , userControllers.findAll)
router.delete('/' , userControllers.remove)
router.put('/' , userControllers.update)

module.exports = router