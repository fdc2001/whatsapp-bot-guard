const {mongoose} = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
      chatId:{
        type: String,
        required: true
      },
      createdBy:{
        type: String,
        required: true
      },
      rules:{
        type: Array,
        required: true
      },
})
const group = mongoose.model('group', groupSchema);
module.exports = group;