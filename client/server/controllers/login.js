const express = require('express');
const router = express.Router();
const bycrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


router.post('/login',(req,res)=>{
    username = req.body.username,
    password = req.body.password

    User.findOne({username : username})
    .then((user)=>{
        if(!user){
            res.json({success : false , msg : 'User Not foud'});
        }
        else{
            bycrypt.compare(password , user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign(user.toJSON(),config.secret,{
                        expiresIn : 5000000
                    });
                    res.json({success : true , 
                    token : 'JWT' + token,
                    user : {
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        username : user.username
                    }
                    })
                }
                else{
                    res.json({success : false , msg : 'Wrong Password'});
                }
            })
        }
    })
    .catch((err)=>console.log(err));
});

module.exports = router;