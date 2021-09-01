import axios from 'axios';
import config from '../../../config/config';
import { ADMIN_ROUTES } from '../../../routes/routes';
import cookies from '../../../utils/cookies';

class AdminUserGameController {
    static userGame = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const result = await axios.get(`${config.base_url}/api/read-user-game`, { headers: { authorization: `Bearer ${token}` } });
        res.render('backend/layouts/main', { template: '../layouts/user-game/user_game.ejs', title: 'User Game', data: result.data.data });
      } catch (err) {
        console.log(err);
      }
    }

    static updateUserGameView = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        const result = await axios.get(`${config.base_url}/api/find-user-game/${id}`, { headers: { authorization: `Bearer ${token}` } });
        res.render('backend/layouts/main', {
          put: true, template: '../layouts/user-game/update_user_game.ejs', title: 'User Game', data: result.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    }

    static updateUserGame = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        await axios.put(`${config.base_url}/api/update-user-game/${id}`, req.body, { headers: { authorization: `Bearer ${token}` } });
        res.redirect(ADMIN_ROUTES.USERGAME);
      } catch (err) {
        console.log(err);
      }
    }

    static createUserGameView = (req, res) => {
      const errors = req.session.error || undefined;
      delete req.session.error;
      res.render('backend/layouts/main', { template: '../layouts/user-game/create_user_game.ejs', title: 'User Game', error: errors });
    }

    static createUserGame = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        await axios.post(`${config.base_url}/api/create-user-game`, req.body, { headers: { authorization: `Bearer ${token}` } });

        res.redirect(ADMIN_ROUTES.USERGAME);
      } catch (err) {
        req.session.error = err[0];
        res.redirect(ADMIN_ROUTES.USERGAME_CREATE_VIEW);
      }
    }

    static deleteUserGame = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        await axios.delete(`${config.base_url}/api/delete-user-game/${id}`, { headers: { authorization: `Bearer ${token}` } });

        res.redirect(ADMIN_ROUTES.USERGAME);
      } catch (err) {
        console.log(err);
      }
    }
}

export default AdminUserGameController;
