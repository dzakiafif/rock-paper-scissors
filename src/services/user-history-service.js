import db, { UserHistory } from '../models';

class UserHistoryServices {
    static createUserHistory = async ({ room, player1, player1Choose }) => {
      const result = await UserHistory.create({
        room_id: room,
        player1,
        player1_choosen: player1Choose,
      });

      return result;
    }

    static findUserHistoryRoom = async ({ roomId }) => {
      const result = await UserHistory.findOne({
        where: {
          room_id: roomId,
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
