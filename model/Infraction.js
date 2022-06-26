const {mongoose} = require('mongoose');

const Schema = mongoose.Schema;

const infractionSchema = new Schema({
    chatId:{
        type: String,
        required: true
    },
    senderId:{
        type: String,
        required: true
    },
    rule:{
        type: String,
        required: true
    },
    count:{
        type: Number,
        required: true
    },
})
const group = mongoose.model('infraction', infractionSchema);
module.exports = group;