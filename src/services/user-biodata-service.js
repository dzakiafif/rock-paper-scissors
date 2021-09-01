import db, { UserBiodata, UserGame } from '../models';

class UserBiodataService {
      static findUserBiodata = async ({ id }) => {
        const result = await UserBiodata.findAll({
          where: {
            id,
          },
          include: [
            {
              model: UserGame,
              required: true,
              attributes: ['id', 'username', 'role', 'created_at', 'updated_at'],
            },
          ],
        });

        return result;
      }

      static findWithCreateUserBiodata = async ({
        userId, fullname, email, address, phoneNumber, checkGender, checkAge,
      }) => {
        const result = await UserBiodata.findOrCreate({
          where: {
            user_id: userId,
          },
          defaults: {
            fullname,
            email,
            address,
            phone_number: phoneNumber,
            gender: checkGender,
            age: checkAge,
          },
        });

        return result;
      }

      static readUserBiodata = async () => {
        const result = await UserBiodata.findAll({
          include: [
            {
              model: UserGame,
              required: true,
              attributes: ['id', 'username', 'role', 'created_at', 'updated_at'],
            },
          ],
        });

        return result;
      }

      static updateUserBiodata = async ({
        fullname, email, address, phoneNumber, checkGender, checkAge, id,
      }) => {
        const result = await UserBiodata.update({
          fullname,
          email,
          address,
          phone_number: phoneNumber,
          gender: checkGender,
          age: checkAge,
        }, {
          where: {
            id,
          },
          returning: true,
        });

        return result;
      }

      static deleteUserBiodata = async ({ id }) => {
        const result = await UserBiodata.destroy({
          where: {
            id,
          },
        });

        return result;
      }

      static countGenderMaleAndFemale = async () => {
        const result = await db.sequelize.query("select COUNT(CASE WHEN gender='f' THEN gender END) as female, COUNT(CASE WHEN gender='m' THEN gender END) as male from user_biodata", {
          type: db.sequelize.QueryTypes.SELECT,
          plain: true,
        });

        return result;
      }
}

export default UserBiodataService;
