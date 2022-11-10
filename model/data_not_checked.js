const mongoose = require("mongoose")

const data_not_checkedsSchema = new mongoose.Schema({
    data: String,
    bin: String,
    status: Number,
    timeAdd: Date,
    timeUpdate: Date,
})

module.exports = mongoose.model("data_not_checkeds", data_not_checkedsSchema)