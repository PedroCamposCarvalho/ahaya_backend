import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserTypesController from '../controllers/UserTypesController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const userTypesController = new UserTypesController();

usersRouter.post('/', usersController.create);

usersRouter.get(
  '/findUserType',
  ensureAtuthenticated,
  userTypesController.findByTypeId,
);

usersRouter.patch(
  '/avatar',
  ensureAtuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.get('/findAll', ensureAtuthenticated, usersController.findAllUsers);

usersRouter.get(
  '/findLikeName',
  ensureAtuthenticated,
  usersController.findLikeName,
);

usersRouter.get('/isUserVIP', ensureAtuthenticated, usersController.isUserVIP);

usersRouter.put(
  '/changeVIPStatus',
  ensureAtuthenticated,
  usersController.changeVIPStatus,
);

usersRouter.get('/findById', ensureAtuthenticated, usersController.findById);

usersRouter.get('/findBySsn', usersController.findBySsn);

usersRouter.get('/findByEmail', usersController.findByEmail);

usersRouter.get('/findBirthdaysToNotify', usersController.findAllBirthdays);

usersRouter.get('/verifyUserFirstLogin', usersController.verifyUserFirstLogin);

usersRouter.put(
  '/createFirstLoginPassword',
  usersController.createFirstLoginPassword,
);

usersRouter.post('/saveLoginHistory', usersController.saveLoginHistory);

usersRouter.get('/findEvents', usersController.findNextEvents);

usersRouter.put('/updateNotificationId', usersController.updateNotificationId);

usersRouter.get(
  '/findUserCategoryBySport',
  usersController.findUserCategoryBySport,
);

usersRouter.put('/updateUserCategory', usersController.updateUserCategory);

usersRouter.get('/testeSocketIo', usersController.testeSocketIo);

usersRouter.get('/isUserAdmin', usersController.isUserAdmin);

usersRouter.get('/findAllUserTypes', usersController.findAllUserTypes);

usersRouter.post('/createPasswordCode', usersController.createPasswordCode);

usersRouter.get('/validateLastCode', usersController.validateLastCode);

usersRouter.delete('/deleteUser', usersController.deleteUser);

export default usersRouter;
