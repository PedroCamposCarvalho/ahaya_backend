import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import ClubController from '../controllers/ClubController';

const clubRouter = Router();

const clubController = new ClubController();

clubRouter.get(
  '/findAllPlans',
  ensureAtuthenticated,
  clubController.findAllPlans,
);

clubRouter.get(
  '/findAllRules',
  ensureAtuthenticated,
  clubController.findAllRules,
);

clubRouter.post(
  '/createMember',
  ensureAtuthenticated,
  clubController.createMember,
);

clubRouter.get(
  '/findUserById',
  ensureAtuthenticated,
  clubController.findMemberById,
);

clubRouter.put(
  '/redeemDrink',
  ensureAtuthenticated,
  clubController.redeemDrink,
);

clubRouter.delete(
  '/deleteClubMember',
  ensureAtuthenticated,
  clubController.deleteClubMember,
);

clubRouter.get(
  '/findAllMembers',
  ensureAtuthenticated,
  clubController.findAllMembers,
);

clubRouter.get(
  '/findAllExpiredMembers',
  ensureAtuthenticated,
  clubController.findAllExpiredMembers,
);

clubRouter.get(
  '/findAllMembersCloseToExpire',
  ensureAtuthenticated,
  clubController.findAllMembersCloseToExpire,
);

export default clubRouter;
