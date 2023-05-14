const mongoose = require('mongoose');
const config = require("../../config.js")
const GuildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        default: config.defaultPrefix
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