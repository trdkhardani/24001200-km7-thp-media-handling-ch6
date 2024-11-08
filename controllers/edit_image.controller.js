const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const imagekit = require('../libs/imagekit')
const validateFile = require('../libs/multer');

router.patch('/:id', async (req, res, next) => {
    const imageId = Number(req.params.id)

    
    try {
        const oldImageData = await prisma.image.findUnique({
            where: {
                id: imageId
            }
        })

        if(!oldImageData){
            throw {
                statusCode: 404,
            }
        }
    
        let imageFileDetails = { // imageFileDetails object with the properties from oldImageData
            image_url: oldImageData.image_url,
            image_field_id: oldImageData.image_field_id
        }

        const file = req.file;
        
        if(file){ // if there's file input or upload request. this block will be ignored if there's no file input or upload
            validateFile(file)
    
            const stringFile = file.buffer.toString('base64');
    
            const uploadFile = await imagekit.upload({
                fileName: file.originalname,
                file: stringFile,
            });
            
            await imagekit.deleteFile(oldImageData.image_field_id);

            imageFileDetails = { // change imageFileDetails object properties to uploaded file or image
                image_url: uploadFile.url,
                image_field_id: uploadFile.fileId
            }
        }

        const {
            title,
            description
        } = req.body

        const image = await prisma.image.update({
            where: {
                id: imageId
            },
            data: {
                title: title,
                description: description,
                image_url: imageFileDetails.image_url,
                image_field_id: imageFileDetails.image_field_id
            }
        });

        return res.json({
            status: 'success',
            updated_image_data: {
                image
            }
        })

    } catch(err) {
        if(err.code === 'P2025' || err.statusCode === 404){ // if no matching data by entered image's id
            return res.status(404).json({
                status: 'error',
                message: `Image with id ${imageId} not found`
            })
        }

        res.status(400).json({ 
            status: 'error',
            message: err.message 
        });
        throw err;
    }
})

module.exports = router;