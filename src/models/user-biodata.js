import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    static associate = (models) => {
      const { UserGame } = models;

      UserBiodata.belongsTo(UserGame, { foreignKey: 'user_id' });
    }
  }

  UserBiodata.init({
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    fullname: DataTypes.STRING,
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone_number: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['m', 'f'],
      defaultValue: 'm',
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_biodata',
  });

  return UserBiodata;
};
