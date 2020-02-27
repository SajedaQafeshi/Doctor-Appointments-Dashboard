const express = require('express');
let router = express.Router();
const Doctor = require('../model/doctor.model');


router.get('/doctor', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            Doctor.find((err, docs) => {
                if (!err) {
                    docs = docs.filter((doctor) => {
                        return doctor.userName != "admindoctor"
                    })
                    res.render('doctor/adminDashboard.hbs', {
                        titel: "Doctors Page",
                        style: 'adminDashboard.css',
                        doctors: docs,
                        admin: "Admin "
                    });
                } else {
                    console.log('Error during record insertion : ' + err);
                }
            });
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/update/:id', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            Doctor.findById(req.params.id, (err, doc) => {
                if (!err) {
                    res.render('doctor/addDoctor.hbs', {
                        titel: "Doctors Page",
                        style: 'addDoctor.css',
                        doctorTitle: 'Update',
                        doctor: doc,
                        admin: "Admin "
                    });
                } else {
                    console.log('Error during record insertion : ' + err);
                }
            });
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});


router.get('/delete/:id', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            Doctor.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    res.redirect('/admin/doctor');
                } else {
                    console.log('Error during record insertion : ' + err);
                }
            });
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            res.render('doctor/home.hbs', {
                titel: "Home",
                style: 'home.css',
                admin: "Admin "
            });
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});

router.get('/add', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            res.render('doctor/addDoctor.hbs', {
                titel: "Add Doctor",
                style: 'addDoctor.css',
                doctorTitle: 'Add New',
                admin: "Admin "
            });
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});

router.post('/add', (req, res) => {
    if (req.session.doctor) {
        if (req.session.doctor.userName == "admindoctor") {
            if (req.body._id == '') {
                insertDoctor(req, res);
            } else {
                updateInfo(req, res);
            }
        } else {
            res.redirect('/doctor/home');
        }
    } else {
        res.redirect('/login');
    }
});

function insertDoctor(req, res) {
    let doctor = new Doctor();
    doctor.doctorName = req.body.doctorName;
    doctor.userName = req.body.userName;
    doctor.password = req.body.password;
    doctor.email = req.body.userEmail;
    doctor.phone = req.body.userPhone;
    doctor.major = req.body.userMajor;
    doctor.type = 1;
    doctor.save((err, doc) => {
        if (!err) {
            res.redirect('/admin/doctor');
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateInfo(req, res) {
    Doctor.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, doc) {
        if (!err) {
            res.redirect('/admin/doctor');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }

    });
}

module.exports = router;