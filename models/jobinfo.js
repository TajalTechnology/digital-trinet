'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobInfo extends Model {

    /* ASSOSIATION */
    static associate(models) {
      // JobInfo.belongsToMany(models.User, { through: 'Applications', foreignKey: 'jobId' });
      JobInfo.belongsTo(models.CompanyInfo, { foreignKey: 'companyId', onDelete: 'CASCADE' });
      JobInfo.hasMany(models.Application, { foreignKey: 'jobId', onDelete: 'CASCADE' });

    }
  };
  JobInfo.init({
    position: DataTypes.STRING,
    vacancy: DataTypes.INTEGER,
    jobContext: DataTypes.JSON,
    responsibility: DataTypes.JSON,
    employmentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobInfo',
  });
  return JobInfo;
};