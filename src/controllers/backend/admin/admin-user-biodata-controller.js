import axios from 'axios';
import config from '../../../config/config';
import { ADMIN_ROUTES } from '../../../routes/routes';
import cookies from '../../../utils/cookies';

class AdminUserBiodataController {
    static userBiodata = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const result = await axios.get(`${config.base_url}/api/read-user-biodata`, { headers: { authorization: `Bearer ${token}` } });
        res.render('backend/layouts/main', { template: '../layouts/user-biodata/user_biodata.ejs', title: 'User Biodata', data: result.data.data });
      } catch (err) {
        console.log(err);
      }
    }

    static createUserBiodataView = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const result = await axios.get(`${config.base_url}/api/read-user-game`, { headers: { authorization: `Bearer ${token}` } });
        const errors = req.session.error || undefined;
        delete req.session.error;
        res.render('backend/layouts/main', {
          template: '../layouts/user-biodata/create_user_biodata.ejs', title: 'User Biodata', data: result.data.data, error: errors,
        });
      } catch (err) {
        console.log(err);
      }
    }

    static createUserBiodata = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        await axios.post(`${config.base_url}/api/create-user-biodata`, req.body, { headers: { authorization: `Bearer ${token}` } });

        res.redirect(ADMIN_ROUTES.USERBIODATA);
      } catch (err) {
        req.session.error = err.response.data;
        res.redirect(ADMIN_ROUTES.USERBIODATA_CREATE_VIEW);
      }
    }

    static updateUserBiodataView = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        const result = await axios.get(`${config.base_url}/api/find-user-biodata/${id}`, { headers: { authorization: `Bearer ${token}` } });
        res.render('backend/layouts/main', {
          template: '../layouts/user-biodata/update_user_biodata.ejs', title: 'User Biodata', data: result.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    }

    static updateUserBiodata = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        await axios.put(`${config.base_url}/api/update-user-biodata/${id}`, req.body, { headers: { authorization: `Bearer ${token}` } });
        res.redirect(ADMIN_ROUTES.USERBIODATA);
      } catch (err) {
        console.log(err);
      }
    }

    static deleteUserBiodata = async (req, res) => {
      try {
        const accessToken = cookies(req, 'access_token_admin');
        const token = accessToken.split('=')[1];
        const { id } = req.params;
        await axios.delete(`${config.base_url}/api/delete-user-biodata/${id}`, { headers: { authorization: `Bearer ${token}` } });

        res.redirect(ADMIN_ROUTES.USERBIODATA);
      } catch (err) {
        console.log(err);
      }
    }
}

export default AdminUserBiodataController;
