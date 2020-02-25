require('./model/db');
let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const doctorController = require('./controller/doctorController');
const appointmentController = require('./controller/appointementController');

app.set('views' ,path.join(__dirname,'/views/'));
app.engine('.hbs' , exphbs({
    extname : '.hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));


app.listen(5000,  () => {
    console.log("Doctor Appointments Dashboard listening at 5000.");
});

app.use('/doctor', doctorController);
app.use('/appointement', appointmentController);
//root path 

app.get('/',  (req, res) => {
    res.redirect('/login');
});

app.get('/home',  (req, res) => {
    res.render('doctor/doctors.hbs',{
        titel:"Home",
        style:'doctors.css'
    });
});

app.get('/login',  (req, res) => {
    res.render('login.hbs',{
        titel:"Login",
        style:'login.css'
    });
});

app.post('/login',  (req, res) => {
    console.log(req.body);
    res.render('login.hbs',{
        titel:"Login",
        style:'login.css'
    });
});




