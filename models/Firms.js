const mongoose = require('mongoose')

const FirmSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Фирманинг номи киритилмаган'],
        unique: [true, 'Бундай ном мавжуд']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

// trim and uppercase first letter
FirmSchema.pre('save', function (next) {
        this.name = (this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase()).trim()
        next()
    }
)

module.exports = mongoose.model('Firm', FirmSchema)