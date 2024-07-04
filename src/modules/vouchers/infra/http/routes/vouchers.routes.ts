import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import VouchersController from '../controllers/VouchersController';

const vouchersRouter = Router();

const vouchersController = new VouchersController();

vouchersRouter.use(ensureAtuthenticated);
vouchersRouter.get('/findAllMenu', vouchersController.show);
vouchersRouter.post('/createVoucher', vouchersController.createVoucher);
vouchersRouter.put('/updateVoucher', vouchersController.updateVoucher);

export default vouchersRouter;
