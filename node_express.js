const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

// 미들웨어 설정

app.use('/', express.static(__dirname + '/public'));
app.use('/api/posts', require('./routes/posts');



app.get('*', (req, res) => {
    res.status(404).end();
});

app.listen(3333);

console.log("open 3333");
