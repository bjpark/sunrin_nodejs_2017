exports.login = (req, res) => {
    console.log("ASD");
    res.send(200, {
        success: true,
        message: 'Authentication success!',
    });
}