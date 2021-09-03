import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      const { UserGame, UserGameRoom } = models;

      Room.belongsToMany(UserGame, {
        as: 'UserGame',
        through: UserGameRoom,
      });
    }
  }

  Room.init({
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'room',
  });

  return Room;
};
