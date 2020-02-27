const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let appointementSchema = new Schema({
    patientName: {
        type: String
    },
    doctorName: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    doctorId :{
        type: Schema.ObjectId,
        ref:'doctor'
    }
});

module.exports = mongoose.model('appointement', appointementSchema);