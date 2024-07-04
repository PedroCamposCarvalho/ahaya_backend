import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import CourtsController from '../controllers/Courts/CourtsController';

const courtsRouter = Router();
const courtsController = new CourtsController();

courtsRouter.post('/create', ensureAtuthenticated, courtsController.create);
courtsRouter.get('/findAll', ensureAtuthenticated, courtsController.findAll);
courtsRouter.get(
  '/findLikeName',
  ensureAtuthenticated,
  courtsController.findLikeName,
);
courtsRouter.get('/findById', ensureAtuthenticated, courtsController.findById);
courtsRouter.put(
  '/updateName',
  ensureAtuthenticated,
  courtsController.updateCourtName,
);

courtsRouter.put('/update', ensureAtuthenticated, courtsController.update);

courtsRouter.get(
  '/findBySportId',
  ensureAtuthenticated,
  courtsController.findCourtsBySportId,
);

courtsRouter.get(
  '/findCourtSport',
  ensureAtuthenticated,
  courtsController.findCourtSport,
);

courtsRouter.get(
  '/findAllCourtTypes',
  ensureAtuthenticated,
  courtsController.findAllCourtTypes,
);

courtsRouter.delete(
  '/deleteCourt',
  ensureAtuthenticated,
  courtsController.deleteCourt,
);

export default courtsRouter;
