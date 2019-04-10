const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    fb_id : {
        type :String
    },
    linkedin_id : {
        type : String
    },
    token : {
        type : String
    },
    name : {
        type:String,
        required:true
    },
    username : {
        type : String,
        unique : true,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type :String
    },
    title : {
        type :String
    },
    company :{
        type: String
    },
    education : {
        type : String
    },
    location : {
        type : String
    },
    phone : {
        type : String
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpires : {
        type : String
    },
    resume: {
      data: Buffer,
      contentType: String
    },
    profilePic: {
      data: Buffer,
      contentType: String
    },
    about: {
      type: String
    },
    expirence: {
      type: String
    },
    lkprofilePic: {
      type: String
    }
})

const User = module.exports = mongoose.model('user',UserSchema);
