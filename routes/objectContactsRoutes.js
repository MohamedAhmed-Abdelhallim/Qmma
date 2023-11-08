const express = require('express')
const objectContactsControllers = require('../controllers/objectContactControllers')

const router = express.Router()

router.post('/' , objectContactsControllers.create)
router.get('/' , objectContactsControllers.findContact)
// router.get('/' , objectContactsControllers.findAll)
// router.delete('/' , objectContactsControllers.remove)

module.exports = router