import { Router } from 'express';

import ensureAtuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';
import ChatController from '../controllers/ChatController';

const chatRoutes = Router();

const chatController = new ChatController();

chatRoutes.get(
  '/findChatMessages',
  ensureAtuthenticated,
  chatController.findChatMessages,
);

chatRoutes.post(
  '/insertMessage',
  ensureAtuthenticated,
  chatController.insertMessage,
);

export default chatRoutes;
