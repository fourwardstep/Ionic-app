const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
    company: {
        type: String
    },
    jobtitle: {
        type: String
    },
    location: {
        type: String
    },
    jobtype: {
        type: String
    },
    jobdescription: {
        type: String
    }
});

const JobDetails = module.exports = mongoose.model('JobDetails', jobsSchema, 'JobDetails');