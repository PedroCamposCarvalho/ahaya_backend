import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import TournamentsController from '../controllers/Tournaments/TournamentsController';

const tournamentsRoutes = Router();
const tournamentsController = new TournamentsController();

tournamentsRoutes.get(
  '/findAll',

  tournamentsController.findAll,
);

tournamentsRoutes.post(
  '/createInscription',
  ensureAtuthenticated,
  tournamentsController.createTournament,
);

tournamentsRoutes.get(
  '/isUserStudent',
  ensureAtuthenticated,
  tournamentsController.isUserStudent,
);

tournamentsRoutes.get(
  '/findAllCategories',
  ensureAtuthenticated,
  tournamentsController.findAllCategories,
);

tournamentsRoutes.get(
  '/verifyUserIsSubscribed',
  ensureAtuthenticated,
  tournamentsController.verifyUserIsSubscribed,
);

tournamentsRoutes.get('/schedule', tournamentsController.schedulePixPayment);

tournamentsRoutes.get(
  '/findReportInscriptions',
  tournamentsController.findReportInscriptions,
);

export default tournamentsRoutes;
