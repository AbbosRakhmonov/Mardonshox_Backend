const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')
const {createFirm, deleteFirm, getAllFirms, updateFirm} = require('../controllers/firms')

router.route('/').post(protect, createFirm)
router.route('/:id').put(protect, updateFirm).delete(protect, deleteFirm).get(protect, getAllFirms)

module.exports = router

