import axios from 'axios';
import config from '../../../config/config';
import { ADMIN_ROUTES } from '../../../routes/routes';
import cookies from '../../../utils/cookies';

class AdminUserHistoryController {
    static userHistory = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const result = await axios.get(`${config.base_url}/api/read-user-history`, { headers: { authorization: `Bearer ${token}` } });

        res.render('backend/layouts/main', { template: '../layouts/user-history/user_history.ejs', title: 'User History', data: result });
      } catch (err) {
        console.log(err);
      }
    }

    static deleteUserHistory = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        await axios.delete(`${config.base_url}/api/delete-user-history/${id}`, { headers: { authorization: `Bearer ${token}` } });

        res.redirect(ADMIN_ROUTES.USERHISTORY);
      } catch (err) {
        console.log(err);
      }
    }
}

export default AdminUserHistoryController;
