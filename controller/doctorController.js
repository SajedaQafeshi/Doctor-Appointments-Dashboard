const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Doctor = require('../model/doctor.model');


router.get('/list', (req, res) => {
    Doctor.find((err ,docs) => {
        if (!err) {
            res.render('doctors.hbs', {
                titel: "Doctors Page",
                style: 'doctors.css',
                doctors : docs
            });
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
});

router.get('/update/:id', (req, res) => {
    Doctor.findById(req.params.id, (err ,doc) => {
        if (!err) {
            res.render('addDoctor.hbs', {
                titel: "Doctors Page",
                style: 'addDoctor.css',
                doctor : doc
            });
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Doctor.findByIdAndRemove(req.params.id, (err ,doc) => {
        if (!err) {
            res.redirect('/doctor/list');
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
});


router.get('/', (req, res) => {
    res.render('home.hbs', {
        titel: "Home",
        style: 'home.css'
    });
});

router.get('/info', (req, res) => {
    res.render('info.hbs', {
        titel: "Info page",
        style: 'info.css'
    });
});

router.get('/add', (req, res) => {
    res.render('addDoctor.hbs', {
        titel: "Add Doctor",
        style: 'addDoctor.css'
    });
});

router.post('/add', (req, res) => {
    if (req.body._id == '') {
        insertDoctor(req, res);
    } else {
        updateInfo(req, res);
    }
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
    });
}

function updateInfo(req, res) {
    Doctor.findOneAndUpdate({ _id: req.body._id }, req.body,{new : true}, function (err, doc) {
        if (!err) { 
            res.redirect('/doctor/list');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }
        
    });
}

module.exports = router;