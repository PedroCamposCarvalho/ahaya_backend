import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import NotificationsController from '../controllers/NotificationsController';

const notificationRouter = Router();
const notificationController = new NotificationsController();

notificationRouter.get(
  '/findAllFromUser',
  ensureAtuthenticated,
  notificationController.findAllFromUser,
);

export default notificationRouter;
