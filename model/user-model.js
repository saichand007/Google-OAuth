const mongoose=require("mongoose");
const  Schema=mongoose.Schema;

const userSchema=new Schema({
    username:String,
    googleId:String,
    pic:String
})


const User=mongoose.model("user",userSchema,"users");

module.exports=User;