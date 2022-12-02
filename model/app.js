const mongoose = require("mongoose")

const appSchema = new mongoose.Schema({
    idMail: String,
    name: String,
    msIdApp: String,
    bigIdApp: String,
    status: Number, //1: app live, 2: pending, 3: reject, 4: hide
    timeUpApp: Date,
    timePublish: String,
    addOn: [{
        idAddOn: {type: String},
        bigIdAddons: {type: String},
        displayName: {type: String},
        price: {type: Number}
    }], 
    note: String, // ly do reject
    use: Number, //1 da su dung, 2 chua su dung
    githubLink: String,
    timeAdd: Date,
    timeUpdate: Date,
    countSub: Number,
    targetSub: Number,
})

module.exports = mongoose.model("apps", appSchema)