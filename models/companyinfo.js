'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyInfo extends Model {

    /* ASSOSIATION */
    static associate(models) {
      CompanyInfo.hasMany(models.JobInfo, { foreignKey: 'companyId', onDelete: 'CASCADE' });
    }
  };
  CompanyInfo.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    totalEmployee: DataTypes.INTEGER,
    image: {
      type: DataTypes.STRING,
      get() {
        const path = this.getDataValue("profile");
        const pathSplit = path ? path.split("/") : null;
        const profileUrl = path ? 'profile' + '/' + pathSplit[2] : null;
        return profileUrl;
      }
    }
  }, {
    sequelize,
    modelName: 'CompanyInfo',
  });
  return CompanyInfo;
};