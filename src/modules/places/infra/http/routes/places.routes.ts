import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import PlacesController from '../controllers/Places/PlacesController';
import PlaceLogoController from '../controllers/Places/PlaceLogoController';

const placesRouter = Router();
const upload = multer(uploadConfig.multer);
const placesController = new PlacesController();
const placeLogoController = new PlaceLogoController();
placesRouter.post('/create', placesController.create);
placesRouter.get('/findAll', ensureAtuthenticated, placesController.findAll);
placesRouter.get('/findById', ensureAtuthenticated, placesController.findById);
placesRouter.get('/findWebProps', placesController.findWebProps);
placesRouter.patch(
  '/logo',
  ensureAtuthenticated,
  upload.single('logo'),
  placeLogoController.update,
);

export default placesRouter;
