import axios from 'axios';
import config from '../../../config/config';
import { ADMIN_ROUTES } from '../../../routes/routes';
import cookies from '../../../utils/cookies';

class AdminController {
    static login = (req, res) => {
      res.render('backend/layouts/login', { title: 'Login' });
    }

    static postLogin = async (req, res) => {
      try {
        const loginUser = await axios.post(`${config.base_url}/api/login`, req.body);
        if (loginUser.data.data.role === 'SUPER USER') {
          const dateAddOneHour = new Date(Date.now() + 3600000);
          res.cookie('access_token_admin', loginUser.data.data.token, { expires: dateAddOneHour, httpOnly: true });
          res.redirect(ADMIN_ROUTES.HOMEPAGE);
        }
      } catch (err) {
        console.log(err);
        res.render('backend/layouts/login', { title: 'Login', error: err.response.data });
      }
    }

    static logout = async (req, res) => {
      res.clearCookie('access_token_admin');
      res.redirect(ADMIN_ROUTES.LOGIN);
    }

    static index = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const resultMaleAndFemale = await axios.get(`${config.base_url}/api/user-biodata-male-female`,
          { headers: { authorization: `Bearer ${token}` } });
        const resultAllUserGame = await axios.get(`${config.base_url}/api/all-user-game`,
          { headers: { authorization: `Bearer ${token}` } });
        const resultAllUserHistory = await axios.get(`${config.base_url}/api/all-user-history`,
          { headers: { authorization: `Bearer ${token}` } });

        const result = await Promise.all([
          resultMaleAndFemale, resultAllUserGame, resultAllUserHistory])
          .then(([resultMaleFemale, resultUserGame, resultUserHistory]) => {
            const data = {};
            data.male = resultMaleFemale.data.data.male;
            data.female = resultMaleFemale.data.data.female;
            data.all_game = resultUserGame.data.data;
            data.all_history = resultUserHistory.data.data.score;
            return data;
          });

        res.render('backend/layouts/main', { template: '../../backend/layouts/index.ejs', title: 'Admin Dashboard', data: result });
      } catch (err) {
        console.log(err);
      }
    }
}

export default AdminController;
