require('dotenv').config();

module.exports = {
  dialect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port_app: process.env.PORT,
  base_url: process.env.BASE_URL,
  secret: process.env.SECRET,
};
