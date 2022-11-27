let Data_checked = require('../model/data_checked')
let Data_not_checked = require('../model/data_not_checked')
let Hotmailnew = require('../model/hotmailnew')
let Hotmail2FA = require('../model/hotmail_2fa')
let Account = require('../model/account')
let MsBuyer = require('../model/microsoft_buyer')
let fs = require('fs')


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
            let password = req.body.password
            let code2fa = req.body.code2fa
            let mailReco = req.body.mailReco
            let address = req.body.address
            let name = req.body.name
            let filter = {
                mail: mail
            }
            let findMail = await Hotmail2FA.findOne(filter)
            if(findMail !== null){
                let update = {
                    timeUpdate: new Date(),
                    code2fa: code2fa ? code2fa : findMail.code2fa,
                    mailReco: mailReco ? mailReco : findMail.mailReco,
                    password: password ? password : findMail.password,
                    name: name ? name : findMail.name,
                    address: address ? address: findMail.address,
                }
                let rs_update = await Hotmail2FA.findOneAndUpdate(filter, update, {new: true})
                
                if(rs_update !== null){
                    res.status(200).json({
                        message: 'Update thanh cong',
                    })
                }else{
                    res.status(400).json({
                        message: 'Update that bai',
                    })
                }
            }else{
                res.status(400).json({
                    message: 'Khong co du lieu',
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
        try {
        //     let filter = {
        //         status: {
        //             $ne: 4
        //         }
        //     }
        //     let hotmail = await Hotmail2FA.find({status: 2})
        //     let mapHotMail = new Map()
        //     for(let i = 0; i < hotmail.length; i++){
        //         mapHotMail.set(hotmail[i].mail, "key")
        //     }
        //     let countSucess = 0, countFailed = 0
        //     var readData = fs.readFileSync('data.txt', 'utf8')
        //     var array = readData.split("\r\n")
        //     for(let i = 0; i < array.length; i++){
        //         let rss_data = array[i].split("|")
        //         let mail = rss_data[0]
        //         if(mapHotMail.has(mail)){
        //             let deleteMail = await Hotmail2FA.findOneAndDelete({mail: mail})
        //             if(deleteMail){
        //                 console.log('Xoa mail thanh cong ' + mail);
        //             }
        //             countSucess++
        //         }else{
        //             countFailed++
        //         }
        //         if(i+1 == array.length){
        //             res.status(200).json({
        //                 message: 'Them du lieu thanh cong.',
        //                 total: array.length,
        //                 countSucess: countSucess,
        //                 countFailed: countFailed,
        //             })
        //         }
        //     }
            //---xoa mail filter
            // let deleteFilter = await Hotmail2FA.updateMany({status: 10}, {status: 1})
            let deleteFilter323 = await Data_checked.updateMany({status: 10}, {status: 1})
            if(deleteFilter323){
                res.status(200).json({
                    message: "update thanh cong"
                })
            }
            // return
            //----check trung du lieu
            // let data = await Data_checked.find({useStatus: 1})
            // let hotmail = await Hotmail2FA.find()
            // // let buyer = await MsBuyer.find()
            // let arr = []
            // for(let i=0; i < hotmail.length; i++){
            //     arr.push(hotmail[i]._id.toString())
            // }
            // let filterarr = arr.filter((item, index) => arr.indexOf(item) !== index);
            
            // let newArr = [...new Set(arr)]
            // res.status(200).json({
            //     arrBandau: arr.length,
            //     trungdulieu: filterarr.length,
            //     mangtrung: filterarr,
            //     // newArr: newArr,
            // })
            return
            //---in ra du lieu con thieu
            let rs_arr = [], count = 0
            let arrMsBuyer = await MsBuyer.find()
            let MapBuyer = new Map()
            let MapHotMail = new Map()
            let arrHotMail = await Hotmail2FA.find({status: 4})

            for(let i=0; i<arrHotMail.length; i++){
                MapHotMail.set(arrHotMail[i]._id.toString(), "key")
            }
            for(let i = 0; i < arrMsBuyer.length; i++){
               if(!MapHotMail.has(arrMsBuyer[i].idMail)){
                    rs_arr.push(arrMsBuyer[i].idMail)
               }
            }
            res.status(200).json({
                rs_arr: rs_arr,
                count: rs_arr.length

            })
        } catch (ex) {
            res.status(400).json({
                message: ex.message
            })
        }
    },
    add_list_hotmail2FA: async function (req, res) {
        console.log('---SERVER HOTMAIL--- API add list hotmail 2Fa------')
        try {
            let countSucess = 0, countFailed = 0
            var readData = fs.readFileSync('data.txt', 'utf8')
            var array = readData.split("\r\n")
            let rs_data = await Hotmail2FA.find()
            let map = new Map()
            for(let i = 0; i < rs_data.length; i++){
                map.set(rs_data[i].mail, "key")
            }
            for(let i = 0; i < array.length; i++){
                let rss_data = array[i].split("|")
                let mail = rss_data[0]
                let password = rss_data[1]
                let mailReco = rss_data[2]
                let code2fa = rss_data[3]
               
                let newData = new Hotmail2FA({
                    mail: mail,
                    password: password,
                    code2fa: code2fa,
                    mailReco: mailReco,
                    isdelete: 2,
                    status: 2,
                    timeAdd: new Date(),
                })
                if(map.has(mail) == false){
                    map.set(mail, "key")
                    let save = await newData.save()
                    console.log('Saved  '+  mail);
                    countSucess++
                }else{
                    console.log('Failed  '+ mail);
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
    
}