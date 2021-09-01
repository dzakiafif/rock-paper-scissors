import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { pascalCase } from 'change-case';
import config from '../config/config';

const db = {};
const basename = path.basename(__filename);
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[pascalCase(model.name)] = model;
    } catch (err) {}
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
