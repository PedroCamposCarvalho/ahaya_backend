import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.get('/verifyAppVersion', profileController.verifyAppVersion);
profileRouter.get('/storeUrl', profileController.appStoreUrl);
profileRouter.get('/appMaintence', profileController.appInMaintence);
profileRouter.use(ensureAtuthenticated);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
profileRouter.put(
  '/updateOneSignalId',
  profileController.updateCustomerOneSignalIdService,
);

export default profileRouter;
