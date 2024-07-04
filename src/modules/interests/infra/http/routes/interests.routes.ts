import { Router } from 'express';

// import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import InterestsController from '../controllers/InterestsController';

const interestsRouter = Router();
const interestController = new InterestsController();

interestsRouter.get('/findAllInterests', interestController.findAllInterests);

interestsRouter.get(
  '/findItemByInterests',
  interestController.findItemByInterests,
);

interestsRouter.post('/createInterest', interestController.createInterest);

interestsRouter.post(
  '/createInterestItem',
  interestController.createInterestItem,
);
export default interestsRouter;
