const Joi = require('joi');
const model = {
    user: require('./userModel'),
}

let validator = (scheme, prop="body") => {
    return (req, res, next) => {
        Joi.validate(req[prop], scheme, (err, data) => {
            if (err) { 
                next(err);
            } else {
                req[prop] = data;
                next();
            }
        })
    }
}


exports.checkSession = (req, res) => {
    console.log(req.user);    
    if (req.user) {
        res.send('SESSION CHECKED');
    } else {
        res.send('SESSION NOT DEFINED');
    }
}

exports.validate_login = validator({
    userId: Joi.string().min(4).max(16).required(),
    userPw: Joi.string().min(8).max(64).required(),
});

exports.login = (req, res) => {
    console.log("ASD");
    res.send(200, {
        success: true,
        message: 'Authentication success!',
    });
}

exports.logout = (req, res) => {
    if (req.user) {
        req.logout()
    console.log(req.user);
    res.send('SESSION DELETED');
    } else {
        res.send('SESSION NOT DEFINED');
    }
}



