const model = {
    user: require('./userModel'),
}

exports.checkSession = (req, res) => {
    console.log(req.user);    
    if (req.user) {
    	res.send('SESSION CHECKED');
    } else {
    	res.send('SESSION NOT DEFINED');
    }
}

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



