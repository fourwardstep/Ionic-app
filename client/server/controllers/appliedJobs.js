const express = require('express');
const router = express.Router();
const appliedJobs = require('../models/appliedJobs');


router.post('/appliedJob',(req,res)=>{
appliedJobs.create({
    companyTitle :  req.body.companyTitle,
    jobTitle : req.body.jobTitle,
    location : req.body.location,
    date : req.body.date
}).then((job)=>{
    res.json(job);
}).catch((err)=>console.log(JSON.stringify(err,undefined,2)));
});

router.get('/appliedJob',(req,res)=>{
    appliedJobs.find().then((jobs)=>{
        res.json(jobs);
    }).catch((err)=>console.log(JSON.stringify(err,undefined,2)));
});

module.exports = router;