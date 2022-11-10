let Data_checked = require('../model/data_checked')
let Data_not_checked = require('../model/data_not_checked')
let Hotmail = require('../model/hotmail')
module.exports = {
    add_hotmail: async function(req, res) {
        console.log('---SERVER HOTMAIL -- API ADD hotmail------')
        try{
            let mail = req.body.mail
            let password = req.body.password
            let code2fa = req.body.code2fa
            let mailReco = req.body.mailReco
            let name = req.body.name
            let address = req.body.address
            let dob = req.body.dob
            let status = req.body.status
            let tags = req.body.tags
            let newData = new Hotmail({
                mail: mail,
                password: password,
                code2fa: code2fa ? code2fa : "",
                mailReco: mailReco ? mailReco : "",
                name: name ? name : "",
                address: address ? address : "",
                dob: dob ? dob : "",
                isdelete: 2, //1 xoa 2 ko xoa
                status: status, //1 chua them 2fa, 2 da add 2 fa, 3 add 2fa loi
                tags: tags,
                timeAdd: new Date(),
            })
            let filter = {
                mail: mail,
            }
            let checkExists = await Hotmail.findOne(filter)
            if(checkExists == null){
                let save = await newData.save()
                if(save !== null){
                    res.status(200).json({
                        message: 'Them du lieu thanh cong.',
                    })
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
        console.log('---SERVER HOTMAIL -- API GET hotmail------')
        try{
            let filter = {
                status: {
                    $ne: 10
                }
            }
            if(req.body.status){
                filter.status = req.body.status
            }
            
            let rs_data = await Hotmail.findOne(filter)
            if(rs_data !== null){
                let updateStatus = await Hotmail.findOneAndUpdate({mail: rs_data.mail}, {status: 10}, {new: true})
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
    update_status: async function(req, res){

    }
}