const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const moment = require('moment');

const model = {
    user: require('./routes/user/userModel'),
}

module.exports = () => {
    passport.serializeUser((user, next) => {
        next(null, user); // err, sessionKey
    });
    passport.deserializeUser((user, next) => {
        next(null, user) // 필요하다면 인증 추가
    });

    passport.use(new localStrategy({
        usernameField: 'userId',
        passwordField: 'userPw',
        session: true,
        passReqToCallback: true,
    }, (req, id, pw, next) => {
        console.log(id, pw);
        model.user.checkUser(id, pw, (err, data) => {
            if (data) {
                let user = { id, pw, date: moment().unix() };
                return next(null, user);
            } else {
                return next(null, false, { message: 'Incorrect Data.'});
            }
        })
    }));
}
