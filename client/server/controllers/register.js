const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');
const User = require('../models/user');


router.post('/register',(req,res)=>{
    User.findOne({username : req.body.username})
    .then((user)=>{
        if(user){
            res.json({success : false, msg : 'User already exist with these details'});
        }
        else{
            let newUser = new User({
                name : req.body.name,
                email : req.body.email,
                username : req.body.username,
                password : req.body.password
            });
            bycrypt.genSalt(10,(err,salt)=>{
                if(err) throw err;
                bycrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user)=>{
                        res.json({success : true , msg : 'User registered successfully'});
                    }).catch((err)=>console.log(err));
                })
            })
        }
    })
    .catch((err)=>
    console.log(err));
});


module.exports = router;