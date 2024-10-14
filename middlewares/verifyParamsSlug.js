const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
    const {slug} = req.params;

    const post = await prisma.post.findUnique({where: {slug}});

    if(!post) {
        return res.status(403).json({
            statusCode: 404,
            error: `No data exists with slug: ${slug}`
        })
    }
    
    next();
}