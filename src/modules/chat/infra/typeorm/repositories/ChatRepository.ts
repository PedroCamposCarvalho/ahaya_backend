import { getRepository, Repository } from 'typeorm';

import IChatRepository from '@modules/chat/repositories/IChatRepository';
import ICreateMessageDTO from '../../../dtos/ICreateMessageDTO';
import ChatMessage from '../entities/ChatMessage';

class ChatRepository implements IChatRepository {
  private ormRepository: Repository<ChatMessage>;

  constructor() {
    this.ormRepository = getRepository(ChatMessage);
  }

  public async findChatMessages(
    id_user: string,
    id_admin: string,
  ): Promise<ChatMessage[]> {
    const messages = await this.ormRepository.find({
      where: { id_user, id_admin },
    });
    return messages;
  }

  public async insertMessage(data: ICreateMessageDTO): Promise<ChatMessage> {
    const { id_user, id_admin, sender, text } = data;
    const newMessage = await this.ormRepository.create({
      id_user,
      id_admin,
      sender,
      text,
    });
    await this.ormRepository.save(newMessage);
    return newMessage;
  }
}
export default ChatRepository;
