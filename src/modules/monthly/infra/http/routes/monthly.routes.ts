import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import MonthlyController from '../controllers/MonthlyController';

const monthlyRouter = Router();
const monthlyController = new MonthlyController();

monthlyRouter.get(
  '/findAllAvailableDays',
  ensureAtuthenticated,
  monthlyController.findAllAvailableDays,
);

monthlyRouter.post('/createMonthlyHour', monthlyController.createMonthlyHour);

monthlyRouter.get(
  '/findAvailableHoursForCourt',
  monthlyController.findAvailableHoursForCourt,
);
monthlyRouter.get(
  '/findMonthlyHours',
  ensureAtuthenticated,
  monthlyController.findMonthlyHours,
);

monthlyRouter.post(
  '/createMonthlyUser',
  ensureAtuthenticated,
  monthlyController.createMonthlyUser,
);

monthlyRouter.get(
  '/findUserMonthly',
  ensureAtuthenticated,
  monthlyController.findUserMonthly,
);

monthlyRouter.get(
  '/findAllAdmin',
  ensureAtuthenticated,
  monthlyController.findAllAdmin,
);

monthlyRouter.post(
  '/createMonthlyHoursOnWebSystem',
  ensureAtuthenticated,
  monthlyController.createMonthlyHoursOnWebSystem,
);

monthlyRouter.get(
  '/findAvailableCourtsToCreateOnWebSystem',
  ensureAtuthenticated,
  monthlyController.findAvailableCourtsToCreateOnWebSystem,
);

monthlyRouter.delete(
  '/removeMonthly',
  ensureAtuthenticated,
  monthlyController.removeMonthly,
);

monthlyRouter.get(
  '/findCalendarMonthly',
  ensureAtuthenticated,
  monthlyController.findCalendarMonthly,
);

export default monthlyRouter;
