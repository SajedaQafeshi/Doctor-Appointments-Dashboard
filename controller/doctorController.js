const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Doctor = require('../model/doctor.model');


router.get('/', (req, res) => {
    res.render('home.hbs', {
        titel: "Home",
        style: 'home.css'
    });
});

router.get('/add', (req, res) => {
    res.render('AddDoctor.hbs', {
        titel: "Add Doctor",
        style: 'AddDoctor.css'
    });
});

router.post('/add', (req, res) => {
    insertDoctor(req, res);
});



function insertDoctor(req, res) {
    let doctor = new Doctor();
    doctor.doctorName = req.body.doctorName;
    doctor.userName = req.body.userName;
    doctor.email = req.body.userEmail;
    doctor.phone = req.body.userPhone;
    doctor.major = req.body.userMajor;
    doctor.save((err, doc) => {
        if (!err) {
            res.redirect('/doctor/');
        } else {
            console.log('Error during record insertion : ' + err);
        }
    })

}

module.exports = router;