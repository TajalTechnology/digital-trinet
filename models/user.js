'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    /* ASSOSIATION */
    static associate(models) {
      User.hasMany(models.Application, { foreignKey: 'userId', onDelete: 'CASCADE' });

    }
  };

  User.init({
    profileImage: {
      type: DataTypes.STRING,
      // get() {
      //   const path = this.getDataValue("profile");
      //   const pathSplit = path ? path.split("/") : null
      //   const profileUrl = path ? 'profile' + '/' + pathSplit[2] : null
      //   return profileUrl;
      // }
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,    
    softDelete: DataTypes.BOOLEAN,
    superAdmin: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};