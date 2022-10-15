const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const User = require('../models/User')

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
    // Create user
    const user = await User.create({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    })

    sendTokenResponse(user, 200, res)
})

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
    const {login, password} = req.body

    // Validate email & password
    if (!login || !password) {
        return next(new ErrorResponse('Please provide an login and password', 400))
    }

    // Check for user
    const user = await User.findOne({login}).select('+password')
    const resUser = await User.findOne({login})

    if (!user) {
        return next(new ErrorResponse('Логин ёки парол хато !', 401))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    sendTokenResponse(user, 200, res, resUser)
})

// @desc      Update login and password
// @route     PUT /api/v1/auth/update
// @access    Private
exports.updateLoginAndPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
        )
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

const sendTokenResponse = (user, statusCode, res, resUser) => {
    // Create token
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        options.secure = true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}