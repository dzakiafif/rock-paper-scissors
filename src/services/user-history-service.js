import db, { UserGame, UserHistory } from '../models';

class UserHistoryServices {
    static createUserHistory = async ({ userId }) => {
      const result = await UserHistory.create({
        user_id: userId,
        login_at: new Date(),
      });

      return result;
    }

      static updateUserHistory = async ({ userId }) => {
        const result = await UserHistory.update({
          login_at: new Date(),
        }, {
          where: {
            user_id: userId,
          },
        });

        return result;
      }

      static readUserHistory = async () => {
        const result = await UserHistory.findAll({
          include: [
            {
              model: UserGame,
              required: true,
            },
          ],
        });
        return result;
      }

      static deleteUserHistory = async ({ id }) => {
        const result = await UserHistory.destroy({
          where: {
            id,
          },
        });

        return result;
      }

      static findUserHistory = async ({ userId }) => {
        const result = await UserHistory.findOne({
          where: {
            user_id: userId,
          },
        });

        return result;
      }

      static sumScoreUserHistory = async () => {
        const result = await db.sequelize.query('SELECT COALESCE(SUM(score),0) as score from user_history', {
          type: db.sequelize.QueryTypes.SELECT,
          plain: true,
        });

        return result;
      }
}

export default UserHistoryServices;
