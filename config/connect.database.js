const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://admin:Kh0ngc0dauem%3B@192.168.1.23:27017/Data?authSource=admin&readPreference=primary&directConnection=true&ssl=false', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });
        console.log('connected to database final');
    }catch(e){
        console.log('failed to connect final');
    }
}
async function connectdev(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Data', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('connected to database dev');
    }catch(e){
        console.log('failed to connect dev');
    }
}
module.exports = {connect,connectdev}
