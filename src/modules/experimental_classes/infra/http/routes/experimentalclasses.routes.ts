import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import ExperimentalClassController from '../controllers/ExperimentalClassController';

const experimentalClassRouter = Router();
const experimentalClassController = new ExperimentalClassController();

experimentalClassRouter.get(
  '/schedule',
  experimentalClassController.schedulePixPayment,
);

experimentalClassRouter.post(
  '/create',
  ensureAtuthenticated,
  experimentalClassController.create,
);

experimentalClassRouter.post(
  '/findByDate',
  ensureAtuthenticated,
  experimentalClassController.findByDate,
);

experimentalClassRouter.post(
  '/createUser',
  experimentalClassController.createExperimentalClassUser,
);

experimentalClassRouter.get(
  '/findUsersByList',
  experimentalClassController.findUsersByList,
);

experimentalClassRouter.get(
  '/findExperimentalClass',
  experimentalClassController.findByToken,
);

experimentalClassRouter.get(
  '/findAvailability',
  experimentalClassController.findListAvailability,
);

experimentalClassRouter.delete(
  '/deleteUser',
  experimentalClassController.deleteUser,
);

experimentalClassRouter.get('/findAll', experimentalClassController.findAll);

experimentalClassRouter.get(
  '/findAllByUser',
  experimentalClassController.findAllByUser,
);

experimentalClassRouter.get(
  '/verifyUserIsInList',
  experimentalClassController.verifyUserIsInList,
);

experimentalClassRouter.post(
  '/createConfigClass',
  experimentalClassController.createConfigClass,
);

experimentalClassRouter.get(
  '/findAllConfigDays',
  experimentalClassController.findAllConfigDays,
);

experimentalClassRouter.delete(
  '/deleteConfigClass',
  experimentalClassController.deleteConfigClass,
);

experimentalClassRouter.put(
  '/editConfigClass',
  experimentalClassController.editConfigClass,
);

experimentalClassRouter.delete(
  '/deleteClass',
  experimentalClassController.deleteClass,
);

experimentalClassRouter.get(
  '/scheduleCreate',
  experimentalClassController.scheduleCreate,
);

experimentalClassRouter.get(
  '/findExceptionDayByPlace',
  ensureAtuthenticated,
  experimentalClassController.findExceptionDayByPlace,
);

experimentalClassRouter.post(
  '/createExceptionDay',
  ensureAtuthenticated,
  experimentalClassController.createExceptionDay,
);

experimentalClassRouter.delete(
  '/deleteExceptionDay',
  ensureAtuthenticated,
  experimentalClassController.deleteExceptionDay,
);

experimentalClassRouter.get(
  '/scheduleCreate',
  experimentalClassController.scheduleCreate,
);

export default experimentalClassRouter;
