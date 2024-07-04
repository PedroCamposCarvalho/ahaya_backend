import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import CreditCardsController from '../controllers/CreditCards/CreditCardsController';

const creditCardsRouter = Router();

const creditCardsController = new CreditCardsController();

creditCardsRouter.post(
  '/create',
  ensureAtuthenticated,
  creditCardsController.create,
);

creditCardsRouter.get(
  '/findByUser',
  ensureAtuthenticated,
  creditCardsController.findByUser,
);

creditCardsRouter.delete(
  '/deleteCard',
  ensureAtuthenticated,
  creditCardsController.deleteCard,
);

creditCardsRouter.get(
  '/findByDigitsUser',
  ensureAtuthenticated,
  creditCardsController.findByFinalDigitsAndUser,
);

export default creditCardsRouter;
