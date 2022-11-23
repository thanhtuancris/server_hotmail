const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String,
    key: String,
    fullname: String,
    permission: Number,
})

module.exports = mongoose.model("accounts", accountSchema)