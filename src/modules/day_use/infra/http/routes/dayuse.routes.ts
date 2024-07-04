import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import DayUseController from '../controllers/DayUseController';

const dayUseRouter = Router();
const dayUseController = new DayUseController();

dayUseRouter.get('/schedulePixPayment', dayUseController.schedulePixPayment);

dayUseRouter.post('/create', ensureAtuthenticated, dayUseController.create);

dayUseRouter.post(
  '/findByDate',
  ensureAtuthenticated,
  dayUseController.findByDate,
);

dayUseRouter.post('/createUser', dayUseController.createDayUseUser);

dayUseRouter.get('/findUsersByList', dayUseController.findUsersByList);

dayUseRouter.get('/findDayUse', dayUseController.findByToken);

dayUseRouter.get('/findAvailability', dayUseController.findListAvailability);

dayUseRouter.delete('/deleteUser', dayUseController.deleteUser);

dayUseRouter.get('/findAll', dayUseController.findAll);

dayUseRouter.get('/findAllByUser', dayUseController.findAllByUser);

dayUseRouter.get('/verifyUserIsInList', dayUseController.verifyUserIsInList);

dayUseRouter.put('/retrieveTicket', dayUseController.retrieveTicket);

dayUseRouter.get('/findTicket', dayUseController.findTicket);

dayUseRouter.delete('/deleteDayUse', dayUseController.deleteDayUse);

dayUseRouter.get('/findCourts', dayUseController.FindDayUseCourts);

export default dayUseRouter;
