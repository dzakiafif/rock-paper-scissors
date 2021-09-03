import { validate } from 'indicative/validator';
import bcrypt from 'bcrypt';
import jwt from '../utils/jwt';
import response from '../utils/response';
import ERRORS from '../config/errors';
import UserGameService from '../services/user-game-service';

class LoginController {
    static login = async (req, res) => {
      try {
        const rules = {
          username: 'required',
          password: 'required|min:4',
        };

        const { username, password } = req.body;

        const data = {
          username,
          password,
        };

        const message = {
          required: (field) => `${field} is required`,
          'password.min': 'Password is too short',
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const findUser = await UserGameService.findUserGameByUsername({ username });
        if (findUser === null) {
          throw ERRORS.USER_USERNAME_NOT_EXIST;
        }

        if (!bcrypt.compareSync(password, findUser.password)) {
          throw ERRORS.PASSWORD_WRONG;
        }

        const token = jwt.sign({ id: findUser.id });

        findUser.setDataValue('token', token);
        return res.status(200).json(response.success(findUser));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static register = async (req, res) => {
      try {
        const rules = {
          username: 'required',
          password: 'required|min:4',
        };

        const { username, password } = req.body;

        const data = {
          username,
          password,
        };

        const message = {
          required: (field) => `${field} is required`,
          'password.min': 'Password is too short',
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const findUser = await UserGameService.findUserGameByUsername({ username });
        if (findUser !== null) {
          throw ERRORS.USER_USERNAME_EXIST;
        }

        await UserGameService.createUserGame({ username, password });

        return res.status(200).json(response.success(null, 'successfully registered'));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }
}

export default LoginController;
