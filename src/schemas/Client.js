const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
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

ClientSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("Client", ClientSchema);