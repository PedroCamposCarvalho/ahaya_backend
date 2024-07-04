import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import SportsController from '../controllers/Sports/SportsController';

const sportsRouter = Router();
const upload = multer(uploadConfig.multer);
const sportsController = new SportsController();

sportsRouter.post(
  '/createSport',
  ensureAtuthenticated,
  sportsController.create,
);

sportsRouter.get('/findAll', ensureAtuthenticated, sportsController.findAll);

sportsRouter.get(
  '/findByCourtId',
  ensureAtuthenticated,
  sportsController.findByCourtId,
);

sportsRouter.patch(
  '/photo',
  upload.single('photo'),
  sportsController.updatePhoto,
);

sportsRouter.get(
  '/findPriceBySportId',
  ensureAtuthenticated,
  sportsController.findPriceBySportId,
);

sportsRouter.get(
  '/findSportsForPricesPage',
  ensureAtuthenticated,
  sportsController.findSportsForPricesPage,
);

sportsRouter.get(
  '/findAllCategories',
  ensureAtuthenticated,
  sportsController.findAllCategories,
);

sportsRouter.post(
  '/createCategory',
  ensureAtuthenticated,
  sportsController.createCategory,
);

sportsRouter.put(
  '/updateCategory',
  ensureAtuthenticated,
  sportsController.updateCategory,
);

sportsRouter.delete(
  '/deleteSport',
  ensureAtuthenticated,
  sportsController.deleteSport,
);

export default sportsRouter;
