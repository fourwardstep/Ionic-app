const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
 

 // registering the linkedin user
 router.post('/linkedin', function(req,res) {
   console.log('Receiving linkedin data');
  //  const linkedin_id = req.body.linkedin_id;
   User.findOne({linkedin_id: req.body.linkedin_id}, function(err, linkedinUser) {
     if(err) {
       console.log('err in finding linkedin user '+err);
     }
     // if user exits
     else if(linkedinUser) {
       console.log('user exist');
       const token = jwt.sign(linkedinUser.toJSON(), config.secret, {expiresIn: 604800});
       res.json({success: true, token: 'JWT '+token, user: {
           id: linkedinUser._id,
           linkedin_id: linkedinUser.linkedin_id,
           name: linkedinUser.name,
           username: linkedinUser.username,
           email: linkedinUser.email,
           lkprofilePic: linkedinUser.profilePic
         }, msg: 'user exits'
       });
     }
     // if user doesn't exist
     else {
       User.create({
         linkedin_id: req.body.linkedin_id,
         name: req.body.name,
         username: req.body.username,
         email: req.body.email,
         lkprofilePic: req.body.lkprofilePic
       }, function(err, result) {
         if(err) {
           res.json({success: false, msg: 'failed to add'})
           console.log('error in adding the data '+err);
         }
         else if(result) {
           console.log(typeof(result));
           const token = jwt.sign(result.toJSON(),config.secret,{ expiresIn: 604800 });
           res.json({success: true, token: 'JWT '+token, user: {
             id: result._id,
             linkedin_id: result.linkedin_id,
             name: result.name,
             username: result.username,
             email: result.email,
             lkprofilePic: result.profilePic
           }, msg: 'User added '  });
         }
       });
     }
   });
 
 });

module.exports = router;