const mongoose = require("mongoose")

const hotmailSchema = new mongoose.Schema({
    mail: String,
    password: String,
    code2fa: String,
    mailReco: String,
    name: String,
    address: String,
    dob: String,
    isdelete: Number, //1 xoa 2 ko xoa
    status: Number, //1 chua them 2fa, 2 da add 2 fa, 3 add 2fa loi
    tags: Array,
    timeAdd: Date,
    timeUpdate: Date,
})

module.exports = mongoose.model("hotmails", hotmailSchema)