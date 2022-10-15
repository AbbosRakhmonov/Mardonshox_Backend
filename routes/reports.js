const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/auth')
const {createReport, deleteReport, getAllReports, updateReport} = require('../controllers/reports')

router.route('/').post(protect, createReport)
router.route('/:id').put(protect, updateReport).delete(protect, deleteReport).get(protect, getAllReports)

module.exports = router