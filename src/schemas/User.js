const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

UserSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("User", UserSchema);