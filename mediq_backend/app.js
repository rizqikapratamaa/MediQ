const express = require('express');
const bodyParser = require('body-parser');
const router = require('./route');
const session = require('express-session');

const app = express();
const port = 8000;

app.use(session({
    secret: 's3Kur3-K3y',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');


app.use('/', router);
router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        res.sendFile(__dirname + '/public/welcome-page.html');
    }
});

app.listen(port, () => {
    console.log('server is running at port ', port);
})