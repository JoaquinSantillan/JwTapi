const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:25,
    },    
    email:{
        type:String,
        required:true,
        min:6,
        max:25,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:25,
    },
    date:{
        type:Date,
        default: Date.now
    },
    role:{
        type:String,
        required:false,
        default:'USER_ROLE'
    }
})


module.exports = mongoose.model('User',userSchema)