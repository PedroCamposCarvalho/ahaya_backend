import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import TermsConditionsController from '../controllers/TermsConditions/TermsConditionsController';

const termsRouter = Router();

const termsController = new TermsConditionsController();

termsRouter.get('/find', ensureAtuthenticated, termsController.find);

export default termsRouter;
