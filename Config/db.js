const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect('mongodb://localhost:27017/ABC');
        console.log('DB connected')
    } catch(err) {
        console.log(err)
        console.error('Database connection error:', err);
    }
}

module.exports = connectDB