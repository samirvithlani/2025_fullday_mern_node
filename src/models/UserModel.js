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
    }
})

module.exports = mongoose.model("users",userModel)

