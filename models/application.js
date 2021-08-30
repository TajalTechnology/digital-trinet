'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {

    static associate(models) {
      Application.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE'});
      Application.belongsTo(models.JobInfo, { foreignKey: 'jobId', onDelete: 'CASCADE' });

    }
  };
  Application.init({
    cv: {
      type: DataTypes.STRING,
      get() {
        const path = this.getDataValue("profile");
        const pathSplit = path ? path.split("/") : null
        const profileUrl = path ? 'profile' + '/' + pathSplit[2] : null
        return profileUrl;
      }
    }
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};