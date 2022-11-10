let Data_not_checked = require('../model/data_not_checked')
let fs = require("fs"); 
module.exports = {
    add_data: async function(req, res) {
        try{
            let data = req.body.data
            let rs_data = data.split("|")
            let bin = rs_data[0].substring(0,6)
            let newData = new Data_not_checked({
                data: data,
                bin: bin,
                status: 1,
                timeAdd: new Date()
            })
            let filter = {
                data: data,
            }
            let checkExists = await Data_not_checked.findOne(filter)
            if(checkExists == null){
                let save = await newData.save()
                if(save){
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
                message: ex.message,
            })
        }
    },
    addListData: async function(req, res){

        console.log('---- API add list data ---- ')

        try {
            let countSucess = 0, countFailed = 0
            var readData = fs.readFileSync('data.txt', 'utf8')
            var array = readData.split("\r\n")
            for(let i = 0; i < array.length; i++){
                let rs_data = array[i].split("|")
                let bin = rs_data[0].substring(0,6)

                let newData = new Data_not_checked({
                    data: array[i],
                    bin: bin,
                    status: 1,
                    timeAdd: new Date()
                })
                let filter = {
                    data: array[i],
                }
                let checkExists = await Data_not_checked.findOne(filter)
                if(checkExists == null){
                    let save = await newData.save()
                    console.log('Saved  '+  array[i]);
                    countSucess++
                }else{
                    console.log('Trung du lieu  '+  array[i]);
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
                message: ex.message,
            })
        }
    },
    get_data: async function(req, res){
        console.log("---API GET data not checked ---");
        try{
            let randomData = await Data_not_checked.aggregate([
                {
                    $match: {
                        status: 1
                    }
                },
                {
                    $sample: {
                        size: 1
                    }
                }
            ])
            if (randomData.length > 0) {
                let updateStatus = await Data_not_checked.findOneAndUpdate({data: randomData[0].data, status: 1}, {status: 10}, {new: true})
                res.status(200).json({
                    message: "Lay du lieu thanh cong.",
                    data: updateStatus
                })
                
            }else{
                res.status(400).json({
                    message: "Lay du lieu that bai."
                })
            }
        }catch(ex){
            res.status(400).json({
                message: ex.message,
            })
        }  
    },
}