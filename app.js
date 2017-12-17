const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const multer = require('multer');

const passport = require('passport');
const passport_local = require('./passport');

const app = express();

// 미들웨어 설정

app.use('/', express.static(__dirname + '/public'));
app.use(expressSession({ secret: '5unr1n' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
passport_local();

// Route
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));



app.get('*', (req, res) => {
    res.status(404).end();
});

app.listen(4321);

console.log("open 4321");
