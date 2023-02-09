import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import CancelationRulesController from '../controllers/CancelationRulesController';

const cancelationRulesRouter = Router();

const cancelationRulesController = new CancelationRulesController();

cancelationRulesRouter.post(
  '/',
  ensureAtuthenticated,
  cancelationRulesController.create,
);

cancelationRulesRouter.get(
  '/',
  ensureAtuthenticated,
  cancelationRulesController.findAllRules,
);

cancelationRulesRouter.put(
  '/',
  ensureAtuthenticated,
  cancelationRulesController.update,
);

cancelationRulesRouter.delete(
  '/',
  ensureAtuthenticated,
  cancelationRulesController.delete,
);

export default cancelationRulesRouter;
