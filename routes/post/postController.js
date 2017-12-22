const model = {
    user: require('./postModel'),
}

exports.getPosts = (req, res) => {
    model.user.getPosts((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.json(data);
        }
    })
}