import axios from 'axios';
import config from '../../config/config';
import { VIEW_ROUTES } from '../../routes/routes';
import cookies from '../../utils/cookies';

class BoardController {
    static index = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/user/index.ejs', title: 'Traditional Game' });
    }

    static game = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_user');
        const token = accessToken.split('=')[1];
        const accessRoom = cookies(req, 'room');
        const room = accessRoom.split('=')[1];
        const newArr = [];
        const checkRoom = await axios.get(`${config.base_url}/api/check-room/${room}`, { headers: { authorization: `Bearer ${token}` } });
        checkRoom.data.data.room.forEach((val) => {
          newArr.push(val.user_game_id);
        });
        res.cookie('player1', newArr[0], { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.cookie('player2', newArr[1], { expires: new Date(Date.now() + 3600000), httpOnly: true });
        const data = {
          token,
          room,
          player1: cookies(req, 'player1').split('=')[1],
          player2: cookies(req, 'player2').split('=')[1],
        };
        res.render('frontend/layouts/game', { title: 'ROCK PAPER SCISSORS', data });
      } catch (err) {
        console.log(err);
      }
    }

    static register = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/register.ejs', title: 'Register New User' });
    }

    static login = (req, res) => {
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/login.ejs', title: 'Login' });
    }

    static postRegister = async (req, res) => {
      try {
        await axios.post(`${config.base_url}/api/register`, req.body);

        res.redirect(VIEW_ROUTES.LOGIN);
      } catch (err) {
        res.render('frontend/layouts/main', { template: '../../frontend/layouts/register.ejs', title: 'Register New User', error: err.response.data });
      }
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
