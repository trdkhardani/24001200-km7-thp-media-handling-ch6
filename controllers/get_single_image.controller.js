const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:id', async (req, res, next) => {
    try {
        const imageId = Number(req.params.id)
        
        const image = await prisma.image.findUnique({
            where: {
                id: imageId
            }
        })

        if(!image){
            throw {
                statusCode: 404,
                message: `Image with id ${imageId} not found`
            }
        }

        return res.json({
            status: 'success',
            image_data: image
        })
    } catch(err) {
        if(err.statusCode){
            return res.status(err.statusCode).json({
                status: 'error',
                message: err.message
            })
        }
        next(err)
    }
})

module.exports = router;