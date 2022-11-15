const mongoose = require("mongoose")

const hotmailnewSchema = new mongoose.Schema({
    mail: String,
    password: String,
    status: Number,
    timeAdd: Date,
    timeUpdate: Date,
})

module.exports = mongoose.model("hotmailnews", hotmailnewSchema)