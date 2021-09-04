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
        // req.session.room = room.data.data.id;
        res.cookie('room', room.data.data.id, { expires: new Date(Date.now() + 3600000), httpOnly: true });
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
        const accessRoom = cookies(req, 'room');
        const room = accessRoom.split('=')[1];
        const resultCheckRoom = await axios.get(`${config.base_url}/api/check-room/${room}`, { headers: { authorization: `Bearer ${token}` } });
        if (resultCheckRoom.data.data.total === 2) {
          res.redirect(VIEW_ROUTES.GAME);
        } else {
          res.render('frontend/layouts/main', { template: '../../frontend/layouts/waitingRoom.ejs', title: 'Waiting Room', data: room });
        }
      } catch (err) {
        console.log(err);
      }
    }

    static join = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_user');
        const token = accessToken.split('=')[1];
        // req.session.room = req.body.roomId;
        res.cookie('room', req.body.roomId, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        await axios.post(`${config.base_url}/api/join-room`, req.body, { headers: { authorization: `Bearer ${token}` } });
        res.redirect(VIEW_ROUTES.GAME);
      } catch (err) {
        req.session.error = err.response.data;
        res.redirect(VIEW_ROUTES.ROOM);
      }
    }
}

export default RoomController;
