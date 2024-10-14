const { hashPassword, comparePassword } = require('../utils/password');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const data = {
            name,
            email,
            password: await hashPassword(password)
        }

        const user = await prisma.user.create({ data });

        delete user.id;
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;

        res.json({ user })
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email or password');
        };

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Incorrect email or password');
        };

        const data = {
            name: user.name,
            email: user.email
        }
        res.json({
            msg: "You are logged in",
            data
        })

    } catch (error) {
        next(error)
    }

}

module.exports = {
    register,
    login
}