const {mongoose} = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    }catch (err) {
        console.error(err);
    }
}
module.exports = connectDB;