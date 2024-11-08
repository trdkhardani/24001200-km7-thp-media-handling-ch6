const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

const imagekit = require('../libs/imagekit')

router.delete('/:id', async (req, res, next) => {
    const imageId = Number(req.params.id)

    try {
        const deleteData = await prisma.image.delete({
            where: {
                id: imageId
            }
        })

        const deleteImageFile = await imagekit.deleteFile(deleteData.image_field_id)
        
        return res.json({
            status: 'success',
            message: `Image deleted successfully`,
            deleted_image: {
                image_file: deleteImageFile,
                image_data: deleteData
            }
        })
    } catch(err) {
        if(err.code === 'P2025'){ // if no matching data by entered image's id
            return res.status(404).json({
                status: 'error',
                message: `Image with id ${imageId} not found`
            })
        }
        next(err)
    }
})

module.exports = router;