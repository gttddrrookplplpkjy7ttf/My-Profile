const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    name:String,
    password:{
        type: String
    }
},  { timestamps: true })

module.exports = mongoose.model('users', usersSchema )