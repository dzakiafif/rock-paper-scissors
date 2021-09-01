import { validate } from 'indicative/validator';
import response from '../../../utils/response';
import UserGameService from '../../../services/user-game-service';

class UserGameController {
    static create = async (req, res) => {
      try {
        const rules = {
          username: 'required',
          password: 'required|min:4',
        };

        const data = {
          username: req.body.username,
          password: req.body.password,
        };

        const message = {
          required: (field) => `${field} is required`,
          'password.min': 'Password is too short',
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const {
          username, password,
        } = req.body;

        const createUser = await UserGameService.createUserGame({ username, password });

        return res.status(200).json(response.success(createUser));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static read = async (req, res) => {
      try {
        const result = await UserGameService.readUserGame();

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static update = async (req, res) => {
      try {
        const { id } = req.params;

        const { username, password } = req.body;

        const result = await UserGameService.updateUserGame({ username, password, id });

        return res.status(200).json(response.success(result[1]));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static delete = async (req, res) => {
      try {
        const { id } = req.params;

        await UserGameService.deleteUserGame({ id });

        return res.status(200).json(response.success(null, `delete user game with id ${id} successfully`));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static findOneUserGame = async (req, res) => {
      try {
        const { id } = req.params;

        const result = await UserGameService.findUserGame({ id });

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static allUserGame = async (req, res) => {
      try {
        const result = await UserGameService.countAllUserGame();

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }
}

export default UserGameController;
