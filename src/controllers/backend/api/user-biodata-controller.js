import { validate } from 'indicative/validator';
import response from '../../../utils/response';
import UserBiodataService from '../../../services/user-biodata-service';

class UserBiodataController {
    static create = async (req, res) => {
      try {
        const rules = {
          email: 'required',
          address: 'required',
          phoneNumber: 'required',
          userId: 'required',
        };

        const data = {
          email: req.body.email,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
          userId: req.body.userId,
        };

        const message = {
          required: (field) => `${field} is required`,
        };

        await validate(data, rules, message).catch((error) => { throw error; });

        const {
          fullname, email, address, phoneNumber, userId, gender, age,
        } = req.body;

        const checkAge = age !== '' ? age : 0;
        const checkGender = gender !== '' ? gender : 'm';

        const checkUserBiodata = await UserBiodataService.findWithCreateUserBiodata({
          userId, fullname, email, address, phoneNumber, checkGender, checkAge,
        });

        return res.status(200).json(response.success(checkUserBiodata[0]));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

    static reads = async (req, res) => {
      try {
        const result = await UserBiodataService.readUserBiodata();

        return res.status(200).json(response.success(result));
      } catch (err) {
        const getError = response.errors(err);
        return res.status(getError.code).json(getError);
      }
    }

      static update = async (req, res) => {
        try {
          const { id } = req.params;
          const {
            fullname, email, address, phoneNumber, gender, age,
          } = req.body;

          const checkAge = age !== '' ? age : 0;
          const checkGender = gender !== '' ? gender : 'm';

          const result = await UserBiodataService.updateUserBiodata({
            fullname, email, address, phoneNumber, checkGender, checkAge, id,
          });

          return res.status(200).json(response.success(result[1]));
        } catch (err) {
          const getError = response.errors(err);
          return res.status(getError.code).json(getError);
        }
      }

      static delete = async (req, res) => {
        try {
          const { id } = req.params;

          await UserBiodataService.deleteUserBiodata({ id });

          return res.status(200).json(response.success(null, `delete user biodata with id ${id} successfully`));
        } catch (err) {
          const getError = response.errors(err);
          return res.status(getError.code).json(getError);
        }
      }

      static findOneUserBiodata = async (req, res) => {
        try {
          const { id } = req.params;

          const result = await UserBiodataService.findUserBiodata({ id });

          return res.status(200).json(response.success(result));
        } catch (err) {
          const getError = response.errors(err);
          return res.status(getError.code).json(getError);
        }
      }

      static maleAndFemale = async (req, res) => {
        try {
          const result = await UserBiodataService.countGenderMaleAndFemale();

          return res.status(200).json(response.success(result));
        } catch (err) {
          const getError = response.errors(err);
          return res.status(getError.code).json(getError);
        }
      }
}

export default UserBiodataController;
