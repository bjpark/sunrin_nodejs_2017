const express = require('express');
const multer = require('multer');

const controller = {
    post: require('./postController.js');
};

const dStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    } 
});

const upload = multer({ storage: dStorage});

const router = express.Router();

router.get('/', controller.post.getPosts);

router.post('/:post_id', upload.any(),  controller.post.newPosts);

module.exports = router;

;
