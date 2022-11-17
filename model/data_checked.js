const mongoose = require("mongoose")

const data_checkedSchema = new mongoose.Schema({
    finalNumber: String,
    numberCode: String,
    month: String,
    year: String,
    nation: String,
    ccv: String,
    bin: String,
    name: String,
    address: String,
    isdelete: Number,
    status: Number,
    useStatus: Number, //1 add thanh cong, 2 add that bai, 3 mua thanh cong, 4 mua that bai
    tags: Array,
    timeAdd: Date,
    timeUpdate: Date,
})

module.exports = mongoose.model("data_checkeds", data_checkedSchema)