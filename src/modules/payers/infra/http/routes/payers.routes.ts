import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import PayersController from '../controllers/PayersController';

const payerRouter = Router();
const payersController = new PayersController();

payerRouter.post(
  '/createPackage',
  ensureAtuthenticated,
  payersController.createPackage,
);

payerRouter.get(
  '/findAllPackages',
  ensureAtuthenticated,
  payersController.findAllPackages,
);

payerRouter.put(
  '/updatePackage',
  ensureAtuthenticated,
  payersController.updatePackage,
);

payerRouter.delete(
  '/deletePackage',
  ensureAtuthenticated,
  payersController.deletePackage,
);

payerRouter.post(
  '/createPackagePayer',
  ensureAtuthenticated,
  payersController.createPackagePayer,
);

payerRouter.get(
  '/findRemainingPackages',
  ensureAtuthenticated,
  payersController.findRemainingPackages,
);

payerRouter.post(
  '/createPayer',
  ensureAtuthenticated,
  payersController.createPayer,
);

payerRouter.post(
  '/createMonthlyRequest',
  ensureAtuthenticated,
  payersController.createMonthlyRequest,
);

payerRouter.get(
  '/findPendingRequests',
  ensureAtuthenticated,
  payersController.findPendingRequests,
);

payerRouter.post(
  '/createMonthly',
  ensureAtuthenticated,
  payersController.createMonthly,
);

payerRouter.get(
  '/findAllMonthly',
  ensureAtuthenticated,
  payersController.findAllMonthly,
);

payerRouter.put(
  '/updateMonthly',
  ensureAtuthenticated,
  payersController.updateMonthly,
);

payerRouter.delete(
  '/deleteMonthly',
  ensureAtuthenticated,
  payersController.deleteMonthly,
);

payerRouter.put(
  '/approveMonthly',
  ensureAtuthenticated,
  payersController.approveMonthly,
);

payerRouter.put(
  '/reproveMonthly',
  ensureAtuthenticated,
  payersController.reproveMonthly,
);

payerRouter.get(
  '/findMonthlyPriceByHour',
  ensureAtuthenticated,
  payersController.findMonthlyPriceByHour,
);

payerRouter.post(
  '/createMonthlyCreditCard',
  ensureAtuthenticated,
  payersController.createMonthlyCreditCard,
);

payerRouter.get(
  '/findUserCreditCard',
  ensureAtuthenticated,
  payersController.findUserCreditCard,
);

payerRouter.get(
  '/findAllUserCharges',
  ensureAtuthenticated,
  payersController.findAllUserCharges,
);

payerRouter.get(
  '/findUserChargeConfig',
  ensureAtuthenticated,
  payersController.findUserChargeConfig,
);

payerRouter.post(
  '/usePackagesToWeekClass',
  ensureAtuthenticated,
  payersController.usePackagesToWeekClass,
);

export default payerRouter;
