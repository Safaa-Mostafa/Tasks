const mongoose =require("mongoose")
const bcryptjs =require("bcryptjs");
const e = require("express");
//schema 



const userschema = mongoose.Schema({
title:{
    type:String,
    trim:true
},
typePost:{
    type:String,
    enum:['txt','file'],
    toLowercase:true,
    required:true
},
content:{
    type:String,
    trim:true,
    required:function(){return this.typePost == "txt"}
},
file:{
    type:String,
    trim:true,
    required:function(){return this.typePost != "txt"}
}
})
userschema.methods.toJson =function(){
    const userData =this.toObject()
    return userData
}
const user =mongoose.model("user",userschema)
module.exports =user