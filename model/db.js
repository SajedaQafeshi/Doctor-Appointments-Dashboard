const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/doctordashboard',
 {useNewUrlParser:true},(err) => {
    if (!err) {
        console.log('MongoDB Connection successful');
    } else {
        console.log('Error in DB Connection: ' + err);
    }
});