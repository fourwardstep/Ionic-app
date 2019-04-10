const mongoose = require('mongoose');

const appliedJobsSchema = mongoose.Schema({
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

const appliedJobs = module.exports = mongoose.model('appliedJobs', appliedJobsSchema, 'appliedJobs');