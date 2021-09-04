import { Room, UserGame, UserGameRoom } from '../models';

class RoomService {
    static room = async (id) => {
      const result = await Room.create();
      const userLogin = await UserGame.findByPk(id);
      await result.addUserGame(userLogin, { through: { selfGranted: false } });
      return result;
    }

    static countUserInRoom = async ({ roomId }) => {
      const result = await UserGameRoom.count({
        where: {
          room_id: roomId,
        },
      });

      return result;
    }

    static joinRoom = async ({ roomId, id }) => {
      const result = await Room.findByPk(roomId);
      const userLogin = await UserGame.findByPk(id);
      await result.addUserGame(userLogin, { through: { selfGranted: false } });
      return result;
    }

    static findUserInRoom = async ({ roomId, id }) => {
      const result = await UserGameRoom.findOne({
        where: {
          user_game_id: id,
          room_id: roomId,
        },
      });

      return result;
    }

    static findRoom = async ({ roomId }) => {
      const result = await Room.findByPk(roomId);
      return result;
    }

    static getAllUserInRoom = async ({ roomId }) => {
      const result = await UserGameRoom.findAll({
        where: {
          room_id: roomId,
        },
      });

      return result;
    }
}

export default RoomService;
