const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const router = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/user');
const config = require('../config/config');
let linkaddress = 'http://192.168.0.100:8100/reset-password/';


router.post('/forgot', function(req,res,next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err,buf) {
          const token = buf.toString('hex');
          done(err,token);
        });
      }, function(token,done) {
        User.findOne({email: req.body.email}, function(err,user) {
          if(!user) {
            return res.json({success: false, msg: 'User not found'});
          }
          user.resetPasswordToken = token
          user.resetPasswordExpires = Date.now() + 3600000;
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
        function(token,user,done){
            const smtpTransport = nodemailer.createTransport({
                service : 'Gmail',
                auth : {
                    user : 'astepfourward@gmail.com',
                    pass : config.GmailPassword
                }
            });
            const mailOptions = {
                to : user.email,
                from : 'astepfourward@gmail.com',
                subject : 'Password Reset Token',
                text : 'You are receiving this because you (or someone else) have requested for reset password please click on the following link to reset the password.  If you didnot request this, please ignore this email and your password will remain unchanged. ' + linkaddress + token  
               
            };
            smtpTransport.sendMail(mailOptions,function(err){
                console.log('mail sent');
                res.json({success : true , msg : 'An email has sent to '+ user.email+' with further instructions '});
                done(err,'done');
            });
        }
    ],function(err){
        if(err) return next(err);
        res.json({success : false , msg : 'User not foud'});
    });
});


router.put('/reset/:token', function(req, res, next) {
  console.log('reseting the password');
 async.waterfall([
  function(done){
    User.findOne({resetPasswordToken : req.params.token, resetPasswordExpires : {$gt : Date.now()}},function(err,user){
      if(!user){
        res.json({success : false , msg : 'Invalid token'});
      }if(user){
        console.log(user);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.password = req.body.password;
        bcrypt.genSalt(10,(err,salt)=>{
          if(err) throw err;
          bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password = hash;
            user.save().then((user)=>{
              res.json({success : true, msg : 'Password changed successfully'})
            })
            .catch((err)=>console.log(err));
          })
        })
      } else{
        res.json({success : false , msg : 'Unable to change the password'});
      }
    })
  },function(err){
    if(err){
      console.log(err);
    }
  }
 ])
   
});


module.exports = router;