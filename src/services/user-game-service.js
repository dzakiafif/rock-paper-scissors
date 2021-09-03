import bcrypt from 'bcrypt';
import { UserGame } from '../models';

class UserGameService {
    static createUserGame = async ({ username, password }) => {
      const result = await UserGame.create({
        username,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      });

      return result;
    }

      static findUserGame = async ({ id }) => {
        const result = await UserGame.findByPk(id, { attributes: ['id', 'username', 'role', 'created_at', 'updated_at'] });

        return result;
      }

      static findUserGameByUsername = async ({ username }) => {
        const result = await UserGame.findOne({
          where: {
            username,
          },
        });

        return result;
      }

      static updateUserGame = async ({
        username, password, id,
      }) => {
        const result = await UserGame.update({
          username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        }, {
          where: {
            id,
          },
          returning: true,
        });

        return result;
      }

      static readUserGame = async () => {
        const result = await UserGame.findAll({
          where: {
            role: 'USER',
          },
          attributes: ['id', 'username', 'role', 'created_at', 'updated_at'],
        });

        return result;
      }

      static deleteUserGame = async ({ id }) => {
        const result = await UserGame.destroy({
          where: {
            id,
          },
        });

        return result;
      }

      static countAllUserGame = async () => {
        const result = await UserGame.count({
          where: {
            role: 'USER',
          },
        });

        return result;
      }
}

export default UserGameService;
