import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindChatMessagesService from '@modules/chat/services/FindChatMessagesService';
import InsertMessageService from '@modules/chat/services/InsertMessageService';

export default class ChatController {
  public async findChatMessages(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const findChatMessagesService = container.resolve(
        FindChatMessagesService,
      );

      const { id_user, id_admin, sender } = request.query;

      const chats = await findChatMessagesService.execute(
        String(id_user),
        String(id_admin),
        String(sender),
      );

      return response.json(chats);
    } catch (error) {
      throw new Error();
    }
  }

  public async insertMessage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const insertMessageService = container.resolve(InsertMessageService);

    const chats = await insertMessageService.execute(request.body);

    return response.json(chats);
  }
}
