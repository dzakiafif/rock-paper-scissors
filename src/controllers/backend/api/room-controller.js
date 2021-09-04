import RoomService from '../../../services/room-service';
import response from '../../../utils/response';
import ERRORS from '../../../config/errors';

class RoomController {
    static create = async (req, res) => {
      try {
        const id = req.decoded.id;
        const result = await RoomService.room(id);

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static join = async (req, res) => {
      try {
        const { roomId } = req.body;
        const id = req.decoded.id;

        const checkRoom = await RoomService.findRoom({ roomId });
        if (checkRoom === null) {
          throw ERRORS.ROOM_NOT_EXIST;
        }

        const checkCountUserInRoom = await RoomService.countUserInRoom({ roomId });
        if (checkCountUserInRoom === 2) {
          throw ERRORS.ROOM_FULL;
        }

        const checkUserInRoom = await RoomService.findUserInRoom({ roomId, id });
        if (checkUserInRoom !== null) {
          throw ERRORS.USER_IN_ROOM;
        }

        const joinRooms = await RoomService.joinRoom({ roomId, id });

        return res.status(200).json(response.success(joinRooms));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static checkRoom = async (req, res) => {
      try {
        const { roomId } = req.params;

        const checkUserInRoom = await RoomService.countUserInRoom({ roomId });

        const getAllUserInRoom = await RoomService.getAllUserInRoom({ roomId });

        const data = {
          room: getAllUserInRoom,
          total: checkUserInRoom,
        };

        return res.status(200).json(response.success(data));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }
}

export default RoomController;
