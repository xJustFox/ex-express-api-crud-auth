const getIdLoggedUser = require("../utils/getIdLoggedUser")
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res, next) => {
    const userID = parseInt(await getIdLoggedUser(req));
    const {slug} = req.params;

    const post = await prisma.post.findUnique({where: {slug}});

    if(post.userId !== userID) {
        return res.status(403).json({
            statusCode: 403,
            error: "You do not have permission to edit or delete posts that were not created by you."
        })
    }
    
    next();
}