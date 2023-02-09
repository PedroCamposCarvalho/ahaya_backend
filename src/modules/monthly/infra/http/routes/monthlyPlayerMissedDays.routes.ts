import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import MonthlyUserMissedDaysController from '../controllers/MonthlyUserMissedDaysController';

const monthlyRouter = Router();
const monthlyUserMissedDaysController = new MonthlyUserMissedDaysController();

monthlyRouter.post(
  '/create',
  monthlyUserMissedDaysController.createMonthlyUserMissedDays,
);

monthlyRouter.get(
  '/findByIdMonthly/:id_monthly',
  monthlyUserMissedDaysController.findByIdMonthlyMissedDays,
);

monthlyRouter.delete(
  '/delete/:id',
  monthlyUserMissedDaysController.removeMonthlyMissedDays,
);

export default monthlyRouter;
