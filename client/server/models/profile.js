const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    about: {
        type: String
    },
    education: {
        type: String
    },
    experience: {
        type: String
    },
    resume: {
        data: Buffer,
        contentType: String
    },
    profilepic: {
        data: Buffer,
        contentType: String
    }
});

const profiles = module.exports = mongoose.model('profiles', profileSchema, 'profiles');