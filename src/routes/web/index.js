import express from 'express';
import FrontendController from '../../controllers/frontend/board-controller';
import AdminController from '../../controllers/backend/admin/admin-controller';
import AdminUserBiodataController from '../../controllers/backend/admin/admin-user-biodata-controller';
import AdminUserGameController from '../../controllers/backend/admin/admin-user-game-controller';
import AdminUserHistoryController from '../../controllers/backend/admin/admin-user-history-controller';
import { VIEW_ROUTES, ADMIN_ROUTES } from '../routes';
import CheckExpired from '../../middleware/check-expired';
import RoomController from '../../controllers/frontend/room-controller';

const router = express.Router();

// frontend
router.get(VIEW_ROUTES.ROOT, FrontendController.index);
router.get(VIEW_ROUTES.GAME, FrontendController.game);
router.get(VIEW_ROUTES.REGISTER, FrontendController.register);
router.post(VIEW_ROUTES.REGISTER, FrontendController.postRegister);
router.get(VIEW_ROUTES.LOGIN, FrontendController.login);
router.get(VIEW_ROUTES.ROOM, RoomController.room);
router.post(VIEW_ROUTES.ROOM, RoomController.postRoom);
router.get(VIEW_ROUTES.WAITINGROOM, RoomController.waitingRoom);
router.post(VIEW_ROUTES.LOGIN, FrontendController.postLogin);
router.post(VIEW_ROUTES.JOINROOM, RoomController.join);

// backend
router.get(ADMIN_ROUTES.LOGIN, AdminController.login);
router.post(ADMIN_ROUTES.LOGIN, AdminController.postLogin);
router.get(ADMIN_ROUTES.LOGOUT, AdminController.logout);
router.get(ADMIN_ROUTES.HOMEPAGE, CheckExpired.admin, AdminController.index);

// backend admin user biodata
router.get(ADMIN_ROUTES.USERBIODATA, CheckExpired.admin, AdminUserBiodataController.userBiodata);
router.get(ADMIN_ROUTES.USERBIODATA_CREATE_VIEW,
  CheckExpired.admin,
  AdminUserBiodataController.createUserBiodataView);
router.post(ADMIN_ROUTES.USERBIODATA_CREATE,
  CheckExpired.admin,
  AdminUserBiodataController.createUserBiodata);
router.get(ADMIN_ROUTES.USERBIODATA_EDIT_VIEW,
  CheckExpired.admin,
  AdminUserBiodataController.updateUserBiodataView);
router.post(ADMIN_ROUTES.USERBIODATA_UPDATE,
  CheckExpired.admin,
  AdminUserBiodataController.updateUserBiodata);
router.get(ADMIN_ROUTES.USERBIODATA_DELETE,
  CheckExpired.admin,
  AdminUserBiodataController.deleteUserBiodata);

// backend admin user history
router.get(ADMIN_ROUTES.USERHISTORY, CheckExpired.admin, AdminUserHistoryController.userHistory);
router.get(ADMIN_ROUTES.USERHISTORY_DELETE,
  CheckExpired.admin,
  AdminUserHistoryController.deleteUserHistory);

// backend admin user game
router.get(ADMIN_ROUTES.USERGAME, CheckExpired.admin, AdminUserGameController.userGame);
router.get(ADMIN_ROUTES.USERGAME_CREATE_VIEW,
  CheckExpired.admin,
  AdminUserGameController.createUserGameView);
router.post(ADMIN_ROUTES.USERGAME_CREATE,
  CheckExpired.admin,
  AdminUserGameController.createUserGame);
router.get(ADMIN_ROUTES.USERGAME_EDIT_VIEW,
  CheckExpired.admin,
  AdminUserGameController.updateUserGameView);
router.post(ADMIN_ROUTES.USERGAME_UPDATE,
  CheckExpired.admin,
  AdminUserGameController.updateUserGame);
router.get(ADMIN_ROUTES.USERGAME_DELETE,
  CheckExpired.admin,
  AdminUserGameController.deleteUserGame);

export default router;
