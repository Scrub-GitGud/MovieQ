const mongoose = require('mongoose')
const config = require('config')
const DB_URI = config.get('mongoURI')
const DB_LOCAL_URI = config.get('mongoLocalURI')


const ConnectDB = async () => {
    try {
        await mongoose.connect(DB_LOCAL_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });        

        console.log("MONGO CONNECTED");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = ConnectDB