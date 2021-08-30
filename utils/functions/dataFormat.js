module.exports = {
    userData: (user) => {
        return {
            id: user.dataValues.id,
            profileImage: user.dataValues.profileImage,
            userName: user.dataValues.userName,
            email: user.dataValues.email,
            forgotCode: user.dataValues.forgotCode,
            isAdmin: user.dataValues.isAdmin,
            forgotCodeVerify: user.dataValues.forgotCodeVerify,
            userTypes: user.dataValues.userTypes,
            superAdmin: user.dataValues.superAdmin,
            status: user.dataValues.status,
            softDelete: user.dataValues.softDelete,
            createdAt: user.dataValues.createdAt,
            updatedAt: user.dataValues.updatedAt,
        }
    }
}