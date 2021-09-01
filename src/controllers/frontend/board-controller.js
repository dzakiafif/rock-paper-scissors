import axios from 'axios';
import config from '../../config/config';
import { VIEW_ROUTES } from '../../routes/routes';

class BoardController {
    static index = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/user/index.ejs', title: 'Traditional Game' });
    }

    static game = (req, res) => {
      res.render('frontend/layouts/game', { title: 'ROCK PAPER SCISSORS' });
    }

    static register = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/register.ejs', title: 'Register New User' });
    }

    static login = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/login.ejs', title: 'Login' });
    }

    static room = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/room.ejs', title: 'Room' });
    }

    static postLogin = async (req, res) => {
      try {
        const loginUser = await axios.post(`${config.base_url}/api/login`, req.body);

        if (loginUser.data.data.role === 'USER') {
          const dateAddOneHour = new Date(Date.now() + 3600000);
          res.cookie('access_token_user', loginUser.data.data.token, { expires: dateAddOneHour, httpOnly: true });
          res.redirect(VIEW_ROUTES.ROOM);
        }
      } catch (err) {
        res.render('frontend/layouts/main', { template: '../../frontend/layouts/login.ejs', title: 'Login', error: err.response.data });
      }
    }
}

export default BoardController;
