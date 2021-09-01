import express from 'express';
import path from 'path';
import session from 'express-session';
import web from './routes/web';
import api from './routes/api';

require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'PHKGFYRVETE',
  resave: false,
  saveUninitialized: true,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', web);
app.use('/api', api);

app.listen(process.env.PORT, () => { console.log(`server running at ${process.env.PORT}`); });
