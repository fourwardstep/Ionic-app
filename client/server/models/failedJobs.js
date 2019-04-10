const mongoose = require('mongoose');

const failedJobsSchema = mongoose.Schema({
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
    },
    // userId: {
    //     type: String
    // }
});

const failedJobs = module.exports = mongoose.model('failedJobs', failedJobsSchema, 'failedJobs');