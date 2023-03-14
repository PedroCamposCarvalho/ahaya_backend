import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import ScoreController from '../controllers/ScoreController';

const scoreRouter = Router();

const scoreController = new ScoreController();

scoreRouter.get(
  '/findAllModules',
  ensureAtuthenticated,
  scoreController.findAllModules,
);

scoreRouter.post(
  '/createScoreRule',
  ensureAtuthenticated,
  scoreController.createScoreRule,
);

scoreRouter.put(
  '/updateScoreRule',
  ensureAtuthenticated,
  scoreController.updateScoreRule,
);

scoreRouter.get(
  '/findAllScoreRules',
  ensureAtuthenticated,
  scoreController.findAllScoreRules,
);

scoreRouter.delete(
  '/deleteScoreRule',
  ensureAtuthenticated,
  scoreController.deleteScoreRule,
);

scoreRouter.get(
  '/findUserPoints',
  ensureAtuthenticated,
  scoreController.findUserPoints,
);

scoreRouter.put(
  '/updateUserPoints',
  ensureAtuthenticated,
  scoreController.updateUserPoints,
);

scoreRouter.post(
  '/createUserHistoryScore',
  ensureAtuthenticated,
  scoreController.createUserHistoryScore,
);

export default scoreRouter;
