import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model { }

  UserGame.init({
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['SUPER USER', 'USER'],
      defaultValue: 'USER',
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_game',
  });

  return UserGame;
};
