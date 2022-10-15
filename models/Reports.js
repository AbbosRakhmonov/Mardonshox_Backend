const mongoose = require('mongoose')

const ReportSchema = new mongoose.Schema({
    income: {
        type: Number,
        required: [true, 'Please add an income']
    },
    outcome: {
        type: Number,
        required: [true, 'Please add an outcome']
    },
    comment: {
        type: String,
        trim: true
    },
    firm: {
        type: mongoose.Schema.ObjectId,
        ref: 'Firm',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Report', ReportSchema)