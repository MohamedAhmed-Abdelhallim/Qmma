const express = require('express')
const footerControllers = require('../controllers/footerControllers')

const router = express.Router()

router.post('/' , footerControllers.create)
router.get('/:footerID' , footerControllers.find)
router.get('/' , footerControllers.findAll)
router.delete('/' , footerControllers.remove)

module.exports = router