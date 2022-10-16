const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Firm = require("../models/Firms");

// @desc      Get all firms
// @route     GET /api/v1/firms/:id
// @access    Public
exports.getAllFirms = asyncHandler(async (req, res, next) => {
  const firms = await Firm.find({ user: req.params.id });
  res.status(200).json({
    success: true,
    count: firms.length,
    data: firms,
  });
});

// @desc      Create new firm
// @route     POST /api/v1/firms
// @access    Private
exports.createFirm = asyncHandler(async (req, res, next) => {
  const publishedFirm = await Firm.findOne({ name: req.body.name });

  if (publishedFirm) {
    return next(
      new ErrorResponse(
        `The firm with the name ${req.body.name} already exists`,
        400
      )
    );
  }

  const firm = await Firm.create(req.body);

  res.status(201).json({
    success: true,
    data: firm,
  });
});

// @desc      Update firm
// @route     PUT /api/v1/firms/:id
// @access    Private
exports.updateFirm = asyncHandler(async (req, res, next) => {
  let name = req.body.name;
  const firm = await Firm.findByIdAndUpdate(
    req.params.id,
    {
      name: (name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).trim(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  console.log(firm);

  if (!firm) {
    return next(
      new ErrorResponse(`Firm not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: firm,
  });
});

// @desc      Delete firm
// @route     DELETE /api/v1/firms/:id
// @access    Private
exports.deleteFirm = asyncHandler(async (req, res, next) => {
  const firm = await Firm.findByIdAndDelete(req.params.id);

  if (!firm) {
    return next(
      new ErrorResponse(`Firm not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: req.params.id,
  });
});
