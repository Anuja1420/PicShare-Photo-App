const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const path = require('path');

// Photo model Schema
const Photo = mongoose.model('Photo', new mongoose.Schema({
    title: String,
    description: String,
    filename: String
}));

// Multer setup --> Used for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/');  
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


router.get('/', (req, res) => {
    res.render('upload', { errors: [] });
});

router.post('/', upload.single('photo'), [
    body('title').notEmpty().withMessage("Title is required"),
    body('description').notEmpty().withMessage('Description is required'),
    body('photo').custom((value, {req})=>{
        if(!req.file){
            throw new Error('photo is required');
        }
        return true
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.render('upload', { errors: errors.array() });

    }

    const { title, description } = req.body;
    const photo = new Photo({
        title,
        description,
        filename: req.file.filename
    });

    try {
        await photo.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving photo');
    }
});

module.exports = router;







