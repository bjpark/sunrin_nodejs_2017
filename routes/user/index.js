const express = require('express');

const passport = require('passport');

const controller = {
    user: require('./userController'),
};

const helper = {
    session: require('../../helper/sessionHelper'),
}

const router = express.Router();

// router.get('/', controller.post.getuser);

router.post('/', helper.session.sessionCheck, passport.authenticate('local'), controller.user.login);

module.exports = router;