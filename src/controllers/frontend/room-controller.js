import axios from 'axios';
import config from '../../config/config';
import { VIEW_ROUTES } from '../../routes/routes';
import cookies from '../../utils/cookies';

class RoomController {
    static room = (req, res) => {
      const errors = req.session.error || undefined;
      delete req.session.error;
      res.render('frontend/layouts/main', { template: '../../frontend/layouts/room.ejs', title: 'Room', error: errors });
    }

    static postRoom = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_user');
        const token = accessToken.split('=')[1];
        const room = await axios.post(`${config.base_url}/api/create-room`, req.body, { headers: { authorization: `Bearer ${token}` } });
        req.session.data = room.data.data.id;
        res.redirect(VIEW_ROUTES.WAITINGROOM);
      } catch (err) {
        req.session.error = err.response.data;
        res.redirect(VIEW_ROUTES.ROOM);
      }
    }

    static waitingRoom = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_user');
        const token = accessToken.split('=')[1];
        const data = req.session.data || undefined;
        const resultCheckRoom = await axios.get(`${config.base_url}/api/check-room/${data}`, { headers: { authorization: `Bearer ${token}` } });
        if (resultCheckRoom.data.data === 2) {
          res.redirect(VIEW_ROUTES.GAME);
        } else {
          res.render('frontend/layouts/main', { template: '../../frontend/layouts/waitingRoom.ejs', title: 'Waiting Room', data });
        }
      } catch (err) {
        console.log(err);
      }
    }

    static join = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_user');
        const token = accessToken.split('=')[1];
        await axios.post(`${config.base_url}/api/join-room`, req.body, { headers: { authorization: `Bearer ${token}` } });
        res.redirect(VIEW_ROUTES.GAME);
      } catch (err) {
        req.session.error = err.response.data;
        res.redirect(VIEW_ROUTES.ROOM);
      }
    }
}

export default RoomController;
