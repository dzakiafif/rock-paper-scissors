import Jwt from '../utils/jwt';

const AuthMiddleware = (req, res, next) => {
  const { headers: { authorization = undefined } } = req;

  const unauthorized = () => res.status(401).json({ message: 'Unauthorized' });

  if (!authorization) return unauthorized();

  const basicAuth = (payload) => {
    const [username, password] = Buffer.from(payload, 'base64').toString().split(':');

    if (!username || !password) {
      return unauthorized();
    }

    // TODO: Check whether the password for the username is correct.

    return next();
  };

  const bearerAuth = (token) => {
    req.decoded = Jwt.verify(token);

    return next();
  };

  try {
    const [type, payload] = authorization.split(' ');

    switch (type) {
      case 'Basic': return basicAuth(payload);
      case 'Bearer': return bearerAuth(payload);
      default: return unauthorized();
    }
  } catch (err) {
    console.log(err);
    return unauthorized();
  }
};

export default AuthMiddleware;
