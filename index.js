const wa = require('@open-wa/wa-automate');
require('dotenv').config()
const {mongoose} = require('mongoose');
const {start} = require("./botSystem");
const connectDB = require("./config/dbCoon");

connectDB()
mongoose.connection.once('open', () => {
    console.log('MongoDB is connected')
    wa.create({
        logConsole:true
    }).then(client => start(client));
})

