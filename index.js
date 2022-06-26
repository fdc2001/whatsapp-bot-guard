const wa = require('@open-wa/wa-automate');
require('dotenv').config()
const {mongoose} = require('mongoose');
const {start} = require("./botSystem");
const connectDB = require("./config/dbCoon");

connectDB()
mongoose.connection.once('open', () => {
    console.log('MongoDB is connected')
    wa.create().then(client => start(client));
})

