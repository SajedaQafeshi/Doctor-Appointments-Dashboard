require('./model/db');
let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
let session = require('express-session');
const doctorController = require('./controller/doctorController');
const appointmentController = require('./controller/appointementController');
const Doctor = require('./model/doctor.model');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:'ui2hf893hf23ofn3023fp',resave:false,saveUninitialized:true}));
app.use('/doctor', doctorController);
app.use('/appointement', appointmentController);


app.set('views' ,path.join(__dirname,'/views/'));
app.engine('.hbs' , exphbs({
    extname : '.hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine','hbs');


app.listen(5000,  () => {
    console.log("Doctor Appointments Dashboard listening at 5000.");
});

//root path 

app.get('/',  (req, res) => {
    res.redirect('/login');
});

app.get('/login',  (req, res) => {
    if (req.session.doctor) {
        res.redirect('/doctor/home');
    } else {
        res.render('login.hbs',{
            titel:"Login",
            style:'login.css'
        });
    }
});

app.post('/login',  (req, res) => {
    let userName = req.body.userName;
    let pass = req.body.password;

    Doctor.findOne({userName : userName,
                    password :pass}, (err, doctor) => {
        if (!err) {
            req.session.doctor = doctor;
            res.redirect('/doctor/home');
        } else {
            res.redirect('/login');
         }
    });
});




