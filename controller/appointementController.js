const express = require('express');
let router = express.Router();
const Appointment = require('../model/appointment.model');


router.get('/list', (req, res) => {
    Appointment.find((err, docs) => {
        if (!err) {
            res.render('Appointments.hbs', {
                titel: "Appointments Page",
                style: 'Appointments.css',
                Appointments: docs
            });
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
});

router.get('/update/:id', (req, res) => {
    Appointment.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('addAppointment.hbs', {
                titel: "Appointments Page",
                style: 'addAppointment.css',
                AppointmentTitle: 'Update',
                Appointment: doc
            });
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/Appointment/list');
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
    res.render('addAppointment.hbs', {
        titel: "Add Appointment",
        style: 'addAppointment.css',
        AppointmentTitle: 'Add New'
    });
});

router.post('/add', (req, res) => {
    if (req.body._id == '') {
        insertAppointment(req, res);
    } else {
        updateInfo(req, res);
    }
});

function insertAppointment(req, res) {
    let Appointment = new Appointment();
    Appointment.AppointmentName = req.body.AppointmentName;
    Appointment.userName = req.body.userName;
    Appointment.email = req.body.userEmail;
    Appointment.phone = req.body.userPhone;
    Appointment.major = req.body.userMajor;
    Appointment.save((err, doc) => {
        if (!err) {
            res.redirect('/Appointment/');
        } else {
            console.log('Error during record insertion : ' + err);
        }
    });
}

function updateInfo(req, res) {
    Appointment.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, doc) {
        if (!err) {
            res.redirect('/Appointment/list');
        }
        else {
            console.log('Error during record insertion : ' + err);
        }

    });
}

module.exports = router;