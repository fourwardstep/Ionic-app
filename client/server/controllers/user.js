const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');



router.get('/user', (req, res) => {
    User.find().then((user) => {
        if (!user) {
            res.json({ success: false, msg: 'There is no user data available' });
        } else {
            res.send(user);
        }
    })
        .catch((err) => console.log(err));
});

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if (!user) {
            res.json({ success: false, msg: 'No user found with this id' });
        } else {
            res.send(user);
        }
    }).catch((err) => console.log(JSON.stringify(err, undefined, 2)));
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });

router.put('/update/:id', (req, res) => {
    console.log(req.params.id);
    User.findOneAndUpdate({ _id: req.params.id },
        {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            phone: req.body.phone,
            location: req.body.location,
            title: req.body.title,
            company: req.body.company,
            education: req.body.education
        }).then((user) => {
            if (!user) {
                res.json({ success: false, msg: 'Unable to update userdata' });
            } else {
                res.json({ success: true, msg: 'userdata updated successfully' });
            }
        }).catch((err) => console.log(err));
});

router.put('/profile/:id', function(req,res) {
    User.findByIdAndUpdate({_id: req.params.id},
    {
      education: req.body.education,
      expirence: req.body.expirence,
      about: req.body.about,
      profilePic: req.body.profilePic,
      resume: req.body.resume
    }, function(err,profile) {
      if(err) {
        res.send('err in updating profile ' + err);
      } else {
        res.json(profile);
      }
    })
  })

router.delete('/delete/:id',(req,res)=>{
    User.findByIdAndRemove({_id : req.params.id})
    .then((user)=>{
        if(!user){
            res.json({success : false , msg : 'Sorry User Not Found'});
        }else{
            res.json({success : true , msg : 'User deleted successfully'});
        }
    }).catch((err)=>console.log(JSON.stringify(err,undefined,2)));
});



module.exports = router;