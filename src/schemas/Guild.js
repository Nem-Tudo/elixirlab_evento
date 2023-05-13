const mongoose = require('mongoose');
const GuildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
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

GuildSchema.pre("save", function (next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model("Guild", GuildSchema);