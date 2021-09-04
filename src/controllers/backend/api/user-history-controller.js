import { validate } from 'indicative/validator';
import response from '../../../utils/response';
import UserHistoryServices from '../../../services/user-history-service';

class UserHistoryController {
    static create = async (req, res) => {
      try {
        const rules = {
          room: 'required',
          player1: 'required',
          player1Choose: 'required',
        };

        const data = {
          room: req.body.room,
          player1: req.body.player1,
          player1Choose: req.body.player1Choose,
        };

        const message = {
          required: (field) => `${field} is required`,
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const { room, player1, player1Choose } = req.body;

        await UserHistoryServices.createUserHistory({ room, player1, player1Choose });

        return res.status(200).json(response.success(null, 'User History success created'));
      } catch (err) {
        console.log(err);
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static userHistoryRoom = async (req, res) => {
      try {
        const { roomId } = req.params;

        const result = await UserHistoryServices.findUserHistoryRoom({ roomId });

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static allUserHistory = async (req, res) => {
      try {
        const result = await UserHistoryServices.sumScoreUserHistory();

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }
}

export default UserHistoryController;
