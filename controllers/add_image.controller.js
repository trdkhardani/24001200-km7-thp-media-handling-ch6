const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const imagekit = require('../libs/imagekit')
const validateFile = require('../libs/multer');

router.post('/', async (req, res, next) => {
    try {
        const file = req.file;

        validateFile(file)

        const stringFile = file.buffer.toString('base64');

        const uploadFile = await imagekit.upload({
            fileName: file.originalname,
            file: stringFile,
        })

        const {
            title,
            description
        } = req.body

        const image = await prisma.image.create({
            data: {
                title: title,
                description: description,
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