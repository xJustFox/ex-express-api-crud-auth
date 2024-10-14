const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req) => {
    const {email} = req.user;
    const user = await prisma.user.findUnique({where: {email}});

    return parseInt(user.id);
}