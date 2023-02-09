import { injectable, inject } from 'tsyringe';
import ChatMessage from '../infra/typeorm/entities/ChatMessage';
import IChatRepository from '../repositories/IChatRepository';
import ICreateMessagDTO from '../dtos/ICreateMessageDTO';
@injectable()
class InsertMessageService {
  constructor(
    @inject('ChatRepository')
    private chatRepository: IChatRepository,
  ) {}

  public async execute(data: ICreateMessagDTO): Promise<ChatMessage> {
    const newMessage = await this.chatRepository.insertMessage(data);

    return newMessage;
  }
}

export default InsertMessageService;
