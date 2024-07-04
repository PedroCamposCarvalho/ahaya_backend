import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import MaterialsController from '../controllers/Materials/MaterialsController';

const placesRouter = Router();
const upload = multer(uploadConfig.multer);
const materialsController = new MaterialsController();

placesRouter.post('/create', ensureAtuthenticated, materialsController.create);

placesRouter.patch(
  '/photo',
  ensureAtuthenticated,
  upload.single('photo'),
  materialsController.update,
);

placesRouter.get(
  '/findBySport',
  ensureAtuthenticated,
  materialsController.findBySport,
);

placesRouter.get(
  '/findByAppointment',
  ensureAtuthenticated,
  materialsController.findByAppointment,
);

placesRouter.get('/findAll', ensureAtuthenticated, materialsController.findAll);

export default placesRouter;
