const Router = require('express-promise-router');
const router = Router();

const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const images = await prisma.image.findMany({
            orderBy: {
                id: 'asc'
            }
        })

        return res.json({
            status: 'success',
            images_data: {
                images
            }
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router;