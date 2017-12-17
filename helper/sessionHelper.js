exports.sessionCheck = (req, res, next) => {
    if (req.user) {
        res.redirect('/login_success');
    } else {
        next();
    }
}