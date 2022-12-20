const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Report = require('../models/Reports')
const Firm = require('../models/Firms')

// @desc      Get all reports
// @route     GET /api/v1/reports/:id
// @access    Public
exports.getAllReports = asyncHandler(async (req, res, next) => {
  const reports = await Report.find({firm: req.params.id})
  const firmName = await Firm.findById(req.params.id)
  res.status(200).json({
    success: true,
    count: reports.length,
    data: reports,
    firmName: firmName?.name
  });
});

// @desc      Create new report
// @route     POST /api/v1/reports
// @access    Private
exports.createReport = asyncHandler(async (req, res, next) => {
  const report = await Report.create(req.body);

  res.status(201).json({
    success: true,
    data: report,
  });
});

// @desc      Update report
// @route     PUT /api/v1/reports/:id
// @access    Private
exports.updateReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!report) {
    return next(
      new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: report,
  });
});

// @desc      Delete report
// @route     DELETE /api/v1/reports/:id
// @access    Private
exports.deleteReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findByIdAndDelete(req.params.id);

  if (!report) {
    return next(
      new ErrorResponse(`Report not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: req.params.id,
  });
});
