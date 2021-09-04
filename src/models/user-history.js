import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    static associate = (models) => {
      const { UserGame, Room } = models;

      UserHistory.belongsTo(UserGame, { as: 'players1', foreignKey: 'player1' });
      UserHistory.belongsTo(UserGame, { as: 'players2', foreignKey: 'player2' });
      UserHistory.belongsTo(Room, { foreignKey: 'room_id' });
    }
  }

  UserHistory.init({
    id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    room_id: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'room',
        key: 'id',
      },
    },
    player1: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'user_game',
        key: 'id',
      },
    },
    player2: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'user_game',
        key: 'id',
      },
    },
    player1_choosen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player2_choosen: DataTypes.STRING,
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_history',
  });

  return UserHistory;
};
