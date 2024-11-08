const express = require('express');
const app = express();

const multer = require('multer')();

const addImage = require('../controllers/add_image.controller')
const getAllImages = require('../controllers/get_all_images.controller')
const getSingleImage = require('../controllers/get_single_image.controller')
const deleteImage = require('../controllers/delete_image.controller')
const editImage = require('../controllers/edit_image.controller')

app.get('/', (req, res, next) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`
    const endpointsList = {
        add_image: `POST ${baseUrl}/add-image`,
        get_all_images: `GET ${baseUrl}/get-all-images`,
        get_single_image: `GET ${baseUrl}/get-image/{id}`,
        delete_image: `DELETE ${baseUrl}/delete-image/{id}`,
        update_image: `PATCH ${baseUrl}/edit-image/{id}`,
    }

    return res.json({
        status: 'success',
        message: 'It works!',
        available_endpoints: endpointsList
    })
})

app.use('/add-image', multer.single('image'), addImage)
app.use('/get-all-images', getAllImages)
app.use('/get-image', getSingleImage)
app.use('/delete-image', deleteImage)
app.use('/edit-image', multer.single('image'), editImage)

module.exports = app;