const express = require('express')
const router = express.Router()
const {login, register, updateLoginAndPassword} = require('../controllers/auth')
const {protect} = require('../middleware/auth')

router.post('/login', login)
router.post('/register', register)
router.put('/update', protect, updateLoginAndPassword)

module.exports = router