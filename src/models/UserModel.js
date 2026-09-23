const mongoose = require("mongoose")
const Schema = mongoose.Schema //class

const userModel = new Schema({

    //post -->fileds
    name:{
     type:String   
    },
    age:{
        type:Number
    },
    bloodGroup:{
        type:String,
        enum:["A+","B+","AB+","A-"]
    },
    skills:[{
        type:String
    }],
    address:{
        type:Object
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilepicUrl:{
        type:String
    },
    roleId:{
        type:mongoose.Schema.ObjectId,
        ref:"role"
    }
})

module.exports = mongoose.model("users1",userModel)

