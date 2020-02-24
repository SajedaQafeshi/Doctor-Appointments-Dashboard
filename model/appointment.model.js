const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let appointementSchema = new Schema({
    userName: {
        type: String
    },
    doctorName: {
        type: String
    },
    passowrd: {
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
    }
});

module.exports = mongoose.model('appointement', appointementSchema);