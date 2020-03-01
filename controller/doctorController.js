const express = require('express');
let router = express.Router();
const Doctor = require('../model/doctor.model');
const Appointment = require('../model/appointment.model');

router.get('/home', (req, res) => {
    if (req.session.doctor) {
        Appointment.find((err, appointments) => {
            if (!err) {
                res.render('appointment/appointments.hbs', {
                    titel: "Doctor Page",
                    style: 'appointments.css',
                    doctors: appointments,
                    admin: "Dr " + req.session.doctor.doctorName
                });
            } else {
                console.log('Error during record insertion : ' + err);
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    if (req.session.doctor) {
        res.render('doctor/home.hbs', {
            titel: "Home ",
            style: 'home.css',
            admin: "Admin "
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/info', (req, res) => {
    if (req.session.doctor) {
        Doctor.findById(req.session.doctor._id, (err, doc) => {
            if (!err) {
                res.render('doctor/info.hbs', {
                    titel: "info Page",
                    style: 'info.css',
                    doctorTitle: 'Update',
                    doctor: doc,
                    admin: "Admin "
                });
            } else {
                console.log('Error during record insertion : ' + err);
            }
        });
    } else {
        res.redirect('/login');
    }
});

router.post('/info', (req, res) => {
    if (req.session.doctor) {
        updateInfo(req, res);
    } else {
        res.redirect('/login');
    }
});

function updateInfo(req, res) {
    Doctor.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, doc) {
        if (!err) {
            res.redirect('/doctor/home');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }

    });
}

module.exports = router;