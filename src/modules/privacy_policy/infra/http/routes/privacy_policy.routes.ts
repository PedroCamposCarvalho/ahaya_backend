import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import PrivacyPolicyController from '../controllers/PrivacyPolicyController';

const privacyPolicyRouter = Router();
const privacyPolicyController = new PrivacyPolicyController();

privacyPolicyRouter.get('/find', privacyPolicyController.find);

privacyPolicyRouter.post(
  '/create',
  ensureAtuthenticated,
  privacyPolicyController.create,
);

export default privacyPolicyRouter;
