const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/fblogin',(req,res)=>{

    User.findOne({fb_id:req.body.fb_id})
    .then((user)=>{
        if(!user){
            User.create({
                 fb_id : req.body.fb_id,
                 name : req.body.name,
                 username : req.body.username,
                 email : req.body.email
            }).then((user)=>{
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:500000
                })
                res.json({success:true,msg:'New User Registered successfully',
                token : 'JWT'+token,
                user : {
                    id : user.id,
                    fb_id : user.fb_id,
                    name : user.name,
                    username : user.username,
                    email : user.email
                }
            })
            })
        }
        else{
            const token = jwt.sign(user.toJSON(),config.secret,{
                expiresIn : 500000
            })
            res.json({success:true,msg : 'User already exists with this details',
            token : 'JWT'+token,
            user : {
                id : user.id,
                fb_id : user.fb_id,
                name : user.name,
                username : user.username,
                email : user.email
            }
        })
        }
     
    }).catch(err=>{
        console.log(err);
    })
})


module.exports = router;