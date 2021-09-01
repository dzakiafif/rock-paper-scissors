import { validate } from 'indicative/validator';
import response from '../../../utils/response';
import UserHistoryServices from '../../../services/user-history-service';

class UserHistoryController {
    static create = async (req, res) => {
      try {
        const rules = {
          userId: 'required',
        };

        const data = {
          userId: req.body.userId,
        };

        const message = {
          required: (field) => `${field} is required`,
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const { userId } = req.body;

        await UserHistoryServices.createUserHistory({ userId });

        return res.status(200).json(null, 'User History success created');
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static findOneUserHistory = async (req, res) => {
      try {
        const { userId } = req.params;

        const result = await UserHistoryServices.findUserHistory({ userId });

        return res.status(200).json(result);
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static read = async (req, res) => {
      try {
        const result = await UserHistoryServices.readUserHistory();

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static update = async (req, res) => {
      try {
        const { id } = req.params;

        await UserHistoryServices.updateUserHistory({ userId: id });

        return res.status(200).json(null, 'success update');
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static delete = async (req, res) => {
      try {
        const { id } = req.params;

        await UserHistoryServices.deleteUserHistory({ id });

        return res.status(200).json(null, `delete user history with id ${id} successfully`);
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
