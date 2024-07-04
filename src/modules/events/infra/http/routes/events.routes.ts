import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import EventsController from '../controllers/EventsController';

const eventRouter = Router();
const eventsController = new EventsController();

eventRouter.post('/create', ensureAtuthenticated, eventsController.create);

eventRouter.post(
  '/findByDate',
  ensureAtuthenticated,
  eventsController.findByDate,
);

eventRouter.post('/createUser', eventsController.createEventUser);

eventRouter.get('/findUsersByList', eventsController.findUsersByList);

eventRouter.get('/findEvent', eventsController.findByToken);

eventRouter.get('/findAvailability', eventsController.findListAvailability);

eventRouter.delete('/deleteUser', eventsController.deleteUser);

eventRouter.get('/findAll', eventsController.findAll);

eventRouter.get('/findAllByUser', eventsController.findAllByUser);

eventRouter.get('/verifyUserIsInList', eventsController.verifyUserIsInList);

eventRouter.put('/retrieveTicket', eventsController.retrieveTicket);

eventRouter.get('/findTicket', eventsController.findTicket);

eventRouter.delete('/deleteEvent', eventsController.deleteEvent);

eventRouter.get('/findCourts', eventsController.FindDayUseCourts);

export default eventRouter;
