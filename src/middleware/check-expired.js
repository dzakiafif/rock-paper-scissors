import { ADMIN_ROUTES, VIEW_ROUTES } from '../routes/routes';
import cookie from '../utils/cookies';

class CheckExpired {
    static admin = (req, res, next) => {
      const accessToken = cookie(req, 'access_token_admin');
      if (accessToken === undefined) {
        return res.redirect(ADMIN_ROUTES.LOGIN);
      }

      return next();
    }

    static user = (req, res, next) => {
      const accessToken = cookie(req, 'access_token_user');
      if (accessToken === undefined) {
        return res.redirect(VIEW_ROUTES.LOGIN);
      }

      return next();
    }
}

export default CheckExpired;
