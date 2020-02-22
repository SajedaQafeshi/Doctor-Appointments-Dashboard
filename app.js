let MongoClient = require('mongodb').MongoClient;
let express = require('express');
let path = require('path');
let app = express();
let bodyParser = require('body-parser');
let url = "mongodb://localhost:27017/Doctor-Appointments-Dashboard";
let exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', '.hbs');
app.engine('.hbs' , exphbs({extname : '.hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));


app.listen(5000,  () => {
    console.log("Doctor Appointments Dashboard listening at 5000.");
});

//root path 

app.get('/',  (req, res) => {
    res.render('home.hbs',{
        titel:"Home",
        style:'home.css'
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

app.get('/',  (req, res) => {
    res.render('home.hbs',{
        titel:"Home",
        style:'home.css'
    });
});



