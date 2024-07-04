import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import PaymentDataController from '../controllers/PaymentData/PaymentDataController';

const paymentDataRouter = Router();

const paymentDataController = new PaymentDataController();

paymentDataRouter.get(
  '/find',
  ensureAtuthenticated,
  paymentDataController.find,
);

export default paymentDataRouter;
