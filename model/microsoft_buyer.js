const mongoose = require("mongoose")

const microsoftBuyerSchema = new mongoose.Schema({
    idMail: String,
    idNumber: String,
    idApp: String,
    idUser: String,
    status: Number, //1: add thanh cong, 2: add ko thanh cong, 3 mua thanh cong, 4 mua ko thanh cong
    orderStatus: Number, //1: chua ve, 2: ve lan 1, 3 ve lan n-1
    price: Number,
    timeBuy: Date,
    timeAdd: Date,
    timeUpdate: Date,

})

module.exports = mongoose.model("microsoft_buyers", microsoftBuyerSchema)