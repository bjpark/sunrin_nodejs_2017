const express = require('express');

const passport = require('passport');

const controller = {
    user: require('./userController'),
};

const helper = {
    session: require('../../helper/sessionHelper'),
}

const router = express.Router();

router.get('/', controller.user.checkSession);

router.post('/', controller.user.validate_login, 
helper.session.sessionCheck, 
passport.authenticate('local'), 
controller.user.login);

router.delete('/', controller.user.logout);

module.exports = router;
