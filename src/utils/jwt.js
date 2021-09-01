import jwt from 'jsonwebtoken';
import config from '../config/config';

class Jwt {
  static OPTIONS = {
    expiresIn: '1h',
    algorithm: 'HS256',
  }

  static sign = (payload) => jwt.sign(payload, config.secret, this.OPTIONS);

  static verify = (token) => jwt.verify(token, config.secret, this.OPTIONS);
}

export default Jwt;
