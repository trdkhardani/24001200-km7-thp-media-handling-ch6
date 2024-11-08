const express = require('express');
const app = express();

const multer = require('multer')();

const addImage = require('../controllers/add_image.controller')
const getAllImages = require('../controllers/get_all_images.controller')
const getSingleImage = require('../controllers/get_single_image.controller')

app.get('/', (req, res, next) => {
    res.json({
        status: 'success',
        message: 'It works!'
    })
})

app.use('/add-image', multer.single('image'), addImage)
app.use('/get-all-images', getAllImages)
app.use('/get-image', getSingleImage)

module.exports = app;