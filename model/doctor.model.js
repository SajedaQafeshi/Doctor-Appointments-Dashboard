const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let doctorSchema = new Schema({
    userName: {
        type: String
    },
    doctorName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    major: {
        type: String
    },
    type :{
        type:Number
    }
});

module.exports = mongoose.model('doctor', doctorSchema);