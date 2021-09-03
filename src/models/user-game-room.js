import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class UserGameRoom extends Model {}

  UserGameRoom.init({
    user_game_id: {
      type: DataTypes.UUID,
      references: {
        key: 'id',
        model: 'user_game',
      },
    },
    room_id: {
      type: DataTypes.UUID,
      references: {
        key: 'id',
        model: 'room',
      },
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_game_room',
  });

  return UserGameRoom;
};
