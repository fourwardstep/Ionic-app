const express = require('express');
const router = express.Router();
const jobDetail = require('../models/jobdetails');


router.get('/jobdetails',(req,res)=>{
    jobDetail.find().then((jobs)=>{
        if(!jobs){
            res.json({success : false , msg : 'No jobs found'});
        }else{
            res.json(jobs);
        }
    }).catch((err)=>console.log(err));
});

module.exports = router;