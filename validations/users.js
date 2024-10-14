const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerBody = {
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name must be string",
        }
    },
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is a required field",
            bail: true
        },
        isEmail: {
            errorMessage: "Email must be a valid email",
        },
        custom: {
            options: async (email) => {
                const user = await prisma.user.findUnique({where: {email}});
                if (user) {
                    throw new Error(`This email is already in use`);
                }
                return true;
            }
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is a required field",
            bail: true
        },
        isLength: {
            errorMessage: "Password must be at least 8 characters",
            options: {min: 8}
        }
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Email is a required field",
            bail: true
        },
        isEmail: {
            errorMessage: "Email must be a valid email",
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Password is a required field",
            bail: true
        },
        isLength: {
            errorMessage: "Password must be at least 8 characters",
            options: {min: 8}
        }
    }
}

module.exports = {
    registerBody,
    loginBody
}