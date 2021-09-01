import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class UserHistory extends Model {
    static associate = (models) => {
      const { UserGame } = models;

      UserHistory.belongsTo(UserGame, { foreignKey: 'user_id' });
    }
  }

  UserHistory.init({
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
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    login_at: DataTypes.DATE,
  }, {
    sequelize,
    underscored: true,
    tableName: 'user_history',
  });

  return UserHistory;
};
