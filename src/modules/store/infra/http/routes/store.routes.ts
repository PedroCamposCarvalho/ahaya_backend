import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import StoreController from '../controllers/StoreController';

const storeRouter = Router();
const upload = multer(uploadConfig.multer);
const storeController = new StoreController();

storeRouter.post(
  '/createProduct',
  ensureAtuthenticated,
  storeController.create,
);

storeRouter.get(
  '/findAll',
  ensureAtuthenticated,
  storeController.findAllProducts,
);

storeRouter.patch(
  '/updateImage1',
  ensureAtuthenticated,
  upload.single('image1'),
  storeController.updateImage1,
);

storeRouter.patch(
  '/updateImage2',
  ensureAtuthenticated,
  upload.single('image2'),
  storeController.updateImage2,
);

storeRouter.patch(
  '/updateImage3',
  ensureAtuthenticated,
  upload.single('image3'),
  storeController.updateImage3,
);

storeRouter.get('/findById', ensureAtuthenticated, storeController.findById);

storeRouter.put(
  '/updateProduct',
  ensureAtuthenticated,
  storeController.updateProduct,
);

storeRouter.delete(
  '/deleteProduct',
  ensureAtuthenticated,
  storeController.deleteProduct,
);

storeRouter.post(
  '/createPurchase',
  ensureAtuthenticated,
  storeController.createPurchase,
);

storeRouter.get(
  '/findUserPurchases',
  ensureAtuthenticated,
  storeController.findUserPurchases,
);

storeRouter.get(
  '/findUserPurchases',
  ensureAtuthenticated,
  storeController.findUserPurchases,
);

storeRouter.get(
  '/findNonRetrievedPurchases',
  ensureAtuthenticated,
  storeController.findNonRetrievedPurchases,
);

storeRouter.get(
  '/findRetrievedPurchases',
  ensureAtuthenticated,
  storeController.findRetrievedPurchases,
);

storeRouter.put(
  '/updateRetrievedFlag',
  ensureAtuthenticated,
  storeController.updateRetrievedFlag,
);

export default storeRouter;
