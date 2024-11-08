const express = require('express');
const app = express();

const multer = require('multer')();
const addImage = require('../controllers/add_image.controller')

app.get('/', (req, res, next) => {
    res.json({
        status: 'success',
        message: 'It works!'
    })
})

app.use('/add-image', multer.single('image'), addImage)

module.exports = app;