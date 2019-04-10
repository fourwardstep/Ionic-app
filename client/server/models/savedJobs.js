const mongoose = require('mongoose');

const savedJobsSchema = mongoose.Schema({
    companyTitle: {
        type: String
    },
    jobTitle: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: String
    }// ,
    // userId: {
    //     type: String
    // }
});

const savedJobs = module.exports = mongoose.model('savedJobs', savedJobsSchema, 'savedJobs');