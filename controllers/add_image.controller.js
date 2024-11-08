const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const imagekit = require('../libs/imagekit')
const validateFile = require('../libs/multer');

const validateImageData = require('../validation/image_data.validation');

router.post('/', async (req, res, next) => {
    try {
        const imageData = {
            title: req.body.title,
            description: req.body.description
        }

        const response = validateImageData(imageData);

        if(response.error){
            throw {
                statusCode: 400,
                message: response.error.details
            }
        }
        
        const file = req.file;

        validateFile(file)

        const stringFile = file.buffer.toString('base64');

        const uploadFile = await imagekit.upload({
            fileName: file.originalname,
            file: stringFile,
        })


        const image = await prisma.image.create({
            data: {
                title: imageData.title,
                description: imageData.description,
                image_url: uploadFile.url,
                image_field_id: uploadFile.fileId
            }
        });

        return res.status(201).json({
            status: 'success',
            message: 'Image data successfully sent',
            image_data: {
                name: uploadFile.name,
                type: uploadFile.fileType,
                image_details: {
                    image
                }
            }
        })
    } catch(err) {
        res.status(400).json({ 
            status: 'error',
            message: err.message 
        });
        throw err;
        // next(err);
    }
})

module.exports = router;