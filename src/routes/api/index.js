import express from 'express';
import { API_ROUTES } from '../routes';
import Middleware from '../../middleware';
import UserGameController from '../../controllers/backend/api/user-game-controller';
import UserBiodataController from '../../controllers/backend/api/user-biodata-controller';
import UserHistoryController from '../../controllers/backend/api/user-history-controller';
import LoginController from '../../controllers/login-controller';
import RoomController from '../../controllers/backend/api/room-controller';

const router = express.Router();

router.get(API_ROUTES.ROOT, (req, res) => res.send('hello'));

// User Game
router.post(API_ROUTES.CREATE_USER_GAME, [Middleware.Auth], UserGameController.create);
router.get(API_ROUTES.READ_USER_GAME, [Middleware.Auth], UserGameController.read);
router.get(API_ROUTES.FIND_USER_GAME, [Middleware.Auth], UserGameController.findOneUserGame);
router.put(API_ROUTES.UPDATE_USER_GAME, [Middleware.Auth], UserGameController.update);
router.delete(API_ROUTES.DELETE_USER_GAME, [Middleware.Auth], UserGameController.delete);
router.get(API_ROUTES.ALL_USER_GAME, [Middleware.Auth], UserGameController.allUserGame);

// Login
router.post(API_ROUTES.REGISTER_USER, [Middleware.Guest], LoginController.register);
router.post(API_ROUTES.LOGIN_USER, [Middleware.Guest], LoginController.login);

// User Biodata
router.post(API_ROUTES.CREATE_USER_BIODATA, [Middleware.Auth], UserBiodataController.create);
router.get(API_ROUTES.READ_USER_BIODATA, [Middleware.Auth], UserBiodataController.reads);
router.get(API_ROUTES.FIND_USER_BIODATA,
  [Middleware.Auth],
  UserBiodataController.findOneUserBiodata);
router.put(API_ROUTES.UPDATE_USER_BIODATA, [Middleware.Auth], UserBiodataController.update);
router.delete(API_ROUTES.DELETE_USER_BIODATA, [Middleware.Auth], UserBiodataController.delete);
router.get(API_ROUTES.MALE_FEMALE_USER_BIODATA,
  [Middleware.Auth],
  UserBiodataController.maleAndFemale);

// User History
router.post(API_ROUTES.CREATE_USER_HISTORY, [Middleware.Auth], UserHistoryController.create);
router.get(API_ROUTES.READ_USER_HISTORY, [Middleware.Auth], UserHistoryController.read);
router.get(API_ROUTES.FIND_USER_HISTORY,
  [Middleware.Auth],
  UserHistoryController.findOneUserHistory);
router.put(API_ROUTES.UPDATE_USER_HISTORY, [Middleware.Auth], UserHistoryController.update);
router.delete(API_ROUTES.DELETE_USER_HISTORY, [Middleware.Auth], UserHistoryController.delete);
router.get(API_ROUTES.ALL_USER_HISTORY, [Middleware.Auth], UserHistoryController.allUserHistory);

// Room
router.post(API_ROUTES.CREATE_ROOM, [Middleware.Auth], RoomController.create);
router.post(API_ROUTES.JOIN_ROOM, [Middleware.Auth], RoomController.join);
router.get(API_ROUTES.CHECK_ROOM, [Middleware.Auth], RoomController.checkRoom);

export default router;
