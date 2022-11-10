let Data_checked = require('../model/data_checked')
let Data_not_checked = require('../model/data_not_checked')
let Hotmail = require('../model/hotmail')
module.exports = {
    add_hotmail: async function(req, res) {
        console.log('---API add data checked ------')
        try{
            let finalNumber = req.body.finalNumber
            let data = finalNumber.split("|")
            let numberCode = data[0]
            let ccv, nation
            if(data.length == 4){
                ccv = ""
                nation = data[3]
            }
            if(data.length > 4){
                ccv = data[3] 
                nation = data[4]
            }
            let bin = data[0].substring(0,6)
            let month = data[1]
            let year = data[2]
            let checkData = numberCode + "|" + month + "|" + year
            let name = req.body.name
            let address = req.body.address
            let status = req.body.status
            let tags = req.body.tags
            let newData = new Data_checked({
                finalNumber: finalNumber,
                numberCode: numberCode,
                month: month,
                year: year,
                nation: nation,
                ccv: ccv,
                bin: bin,
                name: name ? name : "",
                address: address ? address : "",
                isdelete: 2,
                status: status,
                tags: tags,
                timeAdd: new Date(),
            })
            let filter = {
                numberCode: numberCode,
            }
            let checkExists = await Data_checked.findOne(filter)
            if(checkExists == null){
                let save = await newData.save()
                if(save !== null){
                    res.status(200).json({
                        message: 'Them du lieu thanh cong.',
                    })
                    let filterNotChecked = {
                        data: checkData,
                        status: 10,
                    }
                    let update = {
                        status: 3
                    }
                    let updateStatus = await Data_not_checked.findOneAndUpdate(filterNotChecked, update, {new: true})
                    if(updateStatus !== null){
                        console.log("Update status thanh cong");
                    }
                }else{
                    res.status(400).json({
                        message: 'Them du lieu that bai.',
                    })
                }
            }else{
                res.status(400).json({
                    message: 'Du lieu da ton tai.',
                })
            }
            
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    },
    get_hotmail: async function(req, res) {
        console.log("---API get data checked---")
        try{
            let filter = {
                status: 1
            }
            if(req.body.bin){
                filter.bin = new RegExp(req.body.bin, "i")
            }
             if(req.body.nation){
                filter.nation = new RegExp(req.body.nation, "i")
            }
            let rs_data = await Data_checked.find(filter)
            if(rs_data !== null && rs_data.length > 0){
                let random = Math.floor(Math.random() * rs_data.length);
                let rs_random = rs_data[random]
                let updateStatus = await Data_checked.findOneAndUpdate({data: rs_random.data}, {status: 10}, {new: true})
                res.status(200).json({
                    message: 'Lay du lieu thanh cong.',
                    data: updateStatus
                })
            }else{
                res.status(400).json({
                    message: 'Lay du lieu that bai'
                })
            }
            
        }catch(ex){
            res.status(400).json({
                message: ex.message
            })
        }
    },
}