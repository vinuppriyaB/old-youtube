const { object } = require("joi");
const mongoose=require("mongoose");

const Schema= mongoose.Schema;


const userSchema=new Schema({
    firstName:{
        type:String,
        minLength:3,
        required:true,
    },
    lastName:{
        type:String,
        minLength:3,
        required:true,
    },
    email:{
        type:String,
        minLength:5,
        required:true,
    },
    password:{
        type:String,
        minLength:3,
        required:true,
    },
    profilePic:{
        type:String
    },
    subscribedChannel:[{}]
})
const User=mongoose.model("User",userSchema,"user");
module.exports=User;