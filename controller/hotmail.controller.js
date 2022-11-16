let Data_checked = require('../model/data_checked')
let Data_not_checked = require('../model/data_not_checked')
let Hotmailnew = require('../model/hotmailnew')
let Hotmail2FA = require('../model/hotmail_2fa')
let Account = require('../model/account')
let fs = require('fs')
const { ifError } = require('assert')
module.exports = {
    add_hotmail_2fa: async function (req, res) {
        console.log('---SERVER HOTMAIL -- API Add hotmail 2fa------')
        try {
            let mail = req.body.mail
            let password = req.body.password
            let code2fa = req.body.code2fa
            let mailReco = req.body.mailReco
            let name = req.body.name
            let address = req.body.address
            let dob = req.body.dob
            let status = req.body.status
            let tags = req.body.tags
            console.log(code2fa);
            if(code2fa == "" || mailReco == ""){
                status = 3
            }
            let newData = new Hotmail2FA({
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
            let checkExists = await Hotmail2FA.findOne(filter)
            if (checkExists == null) {
                let save = await newData.save()
                if (save !== null) {
                    res.status(200).json({
                        message: 'Them du lieu thanh cong.',
                    })
                } else {
                    res.status(400).json({
                        message: 'Them du lieu that bai.',
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Du lieu da ton tai.',
                })
            }

        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    get_hotmail_new: async function (req, res) {
        console.log('---SERVER HOTMAIL -- API GET hotmail new------')
        try {
            let filter = {
                status: 1
            }

            let rs_data = await Hotmailnew.findOne(filter)
            if (rs_data !== null) {
                let updateStatus = await Hotmailnew.findOneAndUpdate({
                    mail: rs_data.mail
                }, {
                    status: 10
                }, {
                    new: true
                })
                res.status(200).json({
                    message: 'Lay du lieu thanh cong.',
                    data: updateStatus
                })
            } else {
                res.status(400).json({
                    message: 'Lay du lieu that bai'
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    get_hotmail_2fa: async function (req, res) {
        console.log('---SERVER HOTMAIL -- API GET hotmail 2fa------')
        try {
            let filter = {
                status: 2
            }

            let rs_data = await Hotmail2FA.findOne(filter)
            if (rs_data !== null) {
                let updateStatus = await Hotmail2FA.findOneAndUpdate({
                    mail: rs_data.mail
                }, {
                    status: 10
                }, {
                    new: true
                })
                res.status(200).json({
                    message: 'Lay du lieu thanh cong.',
                    data: updateStatus
                })
            } else {
                res.status(400).json({
                    message: 'Lay du lieu that bai'
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    update_hotmail: async function (req, res) {
        console.log('---SERVER HOTMAIL -- API update hotmail------')
        try {
            let mail = req.body.mail
            let code2fa = req.body.code2fa
            let address = req.body.address
            let name = req.body.name
            let dob = req.body.dob
            let tags = req.body.tags
            let filter = {
                mail: mail
            }
            let findMail = await Hotmail.findOne(filter)
            let update = {
                timeUpdate: new Date(),
                $set: {
                    code2fa: code2fa ? code2fa : findMail.code2fa,
                    name: name ? name : findMail.name,
                    address: address ? address: findMail.address,
                    dob: dob ? dob : findMail.dob,
                    tags: tags ? tags : findMail.tags,
                },
                // $push: {
                //     tags: tags 
                // }
            }
            let rs_update = await Hotmail2FA.findOneAndUpdate(filter, update, {new: true})
            console.log(rs_update)
            console.log(update)
            if(rs_update !== null){
                res.status(200).json({
                    message: 'Update thanh cong',
                })
            }else{
                res.status(400).json({
                    message: 'Update that bai',
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    hotmail_analyst: async function (req, res) {
        console.log('---SERVER HOTMAIL -- API hotmail analyst------')
        try {
            let token = req.body.token
            let checkAccount = await Account.findOne({
                token: token
            })
            if (checkAccount !== null) {
                if (checkAccount.permission === 10) {
                    let filter = {

                    }
                    if (req.body.mail) {
                        filter.mail = new RegExp(req.body.mail, "i")
                    }
                    if (req.body.isdelete) {
                        filter.isdelete = req.body.isdelete
                    }
                    if (req.body.status) {
                        filter.status = req.body.status
                    }
                    if (req.body.tags) {
                        filter.tags = new RegExp(req.body.tags, "i")
                    }
                    // let totalFilter = await Hotmail2FA.countDocuments(filter)
                    let totalNot2Fa = await Hotmailnew.countDocuments({status: 1})
                    let totalGetNot2Fa = await Hotmailnew.countDocuments({status: 10})
                    let totalAdded2Fa = await Hotmail2FA.countDocuments({status: 2})
                    let totalAdd2FaFail = await Hotmail2FA.countDocuments({status: 3})
                    // let totalHotmail = await Hotmail2FA.countDocuments()

                    res.status(200).json({
                        message: 'Lay du lieu thanh cong',
                        data: {
                            // totalHotmail: totalHotmail,
                            // totalFilter: totalFilter,
                            totalNot2Fa: totalNot2Fa,
                            totalGetNot2Fa: totalGetNot2Fa,
                            totalAdded2Fa: totalAdded2Fa,
                            totalAdd2FaFail: totalAdd2FaFail
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'Khong co quyen thuc thi'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Het phien dang nhap'
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    add_hotmail_new: async function (req, res){
        console.log('---SERVER HOTMAIL -- API add hotmail new------')
        try {
            let mail = req.body.mail
            let password = req.body.password
            let newMail = new Hotmailnew({
                mail: mail,
                password: password,
                status: 1,
                isdelete: 2,
                timeAdd: new Date(),
            })
            let checkExists = await Hotmail.findOne({mail: mail})
            if(checkExists ==  null){
                let save = await newMail.save()
                if(save !== null){
                    res.status(200).json({
                        message: "Them du lieu thanh cong"
                    })
                }else{
                    res.status(400).json({
                        message: "Them du lieu that bai"
                    })
                }
            }else{
                res.status(400).json({
                    message: "Du lieu da ton tai"
                })
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    add_list_hotmail: async function (req, res) {
        console.log('---SERVER HOTMAIL--- API add list hotmail------')
        try {
            let countSucess = 0, countFailed = 0
            var readData = fs.readFileSync('data.txt', 'utf8')
            var array = readData.split("\r\n")
            let rs_data = await Hotmailnew.find()
            let map = new Map()
            for(let i = 0; i < rs_data.length; i++){
                map.set(rs_data[i].mail, "key")
            }
            for(let i = 0; i < array.length; i++){
                let rss_data = array[i].split("|")
                let mail = rss_data[0]
                let password = rss_data[1]
               
                let newData = new Hotmailnew({
                    mail: mail,
                    password: password,
                    status: 1,
                    timeAdd: new Date()
                })
                if(map.has(mail) == false){
                    map.set(mail, "key")
                    let save = await newData.save()
                    console.log('Saved  '+  array[i]);
                    countSucess++
                }else{
                    console.log('Failed  '+  array[i]);
                    countFailed++
                }
                if(i+1 == array.length){
                    res.status(200).json({
                        message: 'Them du lieu thanh cong.',
                        total: array.length,
                        countSucess: countSucess,
                        countFailed: countFailed,
                    })
                }
            }
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    test: async function(req,res){
        let filter = {
            status: 2,
            code2fa: ""
        }
        let data = await Hotmail2FA.find(filter)

        let update = {
            status: 3
        }
        let rs = await Hotmail2FA.updateMany(filter, update)
        if(rs !== null){
            res.status(200).json({
                message: "Update thanh cong"
            })
        }else{
            res.status(400).json({
                message: "Update that bai"
            })
        }
    }
}