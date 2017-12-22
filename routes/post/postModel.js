const mysql = require('../../mysql');

exports.getPosts = (cb) => {
    mysql.query('SELECT * FROM posts;', (err, data) => {
        cb(err, data);
    })
}