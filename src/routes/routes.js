export const API_ROUTES = {
  ROOT: '/',
  LOGIN_USER: '/login',
  CREATE_USER_GAME: '/create-user-game',
  READ_USER_GAME: '/read-user-game',
  FIND_USER_GAME: '/find-user-game/:id',
  UPDATE_USER_GAME: '/update-user-game/:id',
  DELETE_USER_GAME: '/delete-user-game/:id',
  ALL_USER_GAME: '/all-user-game',
  CREATE_USER_BIODATA: '/create-user-biodata',
  READ_USER_BIODATA: '/read-user-biodata',
  FIND_USER_BIODATA: '/find-user-biodata/:id',
  UPDATE_USER_BIODATA: '/update-user-biodata/:id',
  DELETE_USER_BIODATA: '/delete-user-biodata/:id',
  MALE_FEMALE_USER_BIODATA: '/user-biodata-male-female',
  CREATE_USER_HISTORY: '/create-user-history',
  UPDATE_USER_HISTORY: '/update-user-history/:id',
  FIND_USER_HISTORY: '/find-user-history/:userId',
  DELETE_USER_HISTORY: '/delete-user-history/:id',
  READ_USER_HISTORY: '/read-user-history',
  ALL_USER_HISTORY: '/all-user-history',
};

export const VIEW_ROUTES = {
  ROOT: '/',
  GAME: '/game',
  LOGIN: '/login',
  ROOM: '/room',
  REGISTER: '/register',
};

export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  LOGOUT: '/admin/logout',
  HOMEPAGE: '/admin/homepage',
  USERBIODATA: '/admin/userbiodata',
  USERBIODATA_CREATE_VIEW: '/admin/userbiodata/create',
  USERBIODATA_CREATE: '/admin/userbiodata/store',
  USERBIODATA_EDIT_VIEW: '/admin/userbiodata/edit/:id',
  USERBIODATA_UPDATE: '/admin/userbiodata/update/:id',
  USERBIODATA_DELETE: '/admin/userbiodata/delete/:id',
  USERHISTORY: '/admin/userhistory',
  USERHISTORY_DELETE: '/admin/userhistory/delete/:id',
  USERGAME: '/admin/usergame',
  USERGAME_CREATE_VIEW: '/admin/usergame/create',
  USERGAME_CREATE: '/admin/usergame/store',
  USERGAME_EDIT_VIEW: '/admin/usergame/edit/:id',
  USERGAME_UPDATE: '/admin/usergame/update/:id',
  USERGAME_DELETE: '/admin/usergame/delete/:id',
};