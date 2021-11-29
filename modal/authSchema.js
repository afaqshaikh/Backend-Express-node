const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true},
    phone : {type:Number , required:true},
    password: {type:String, required:true},
    cpassword: {type:String, required:true},
})

const authModel = mongoose.model('authSchema',authSchema)
module.exports = authModel