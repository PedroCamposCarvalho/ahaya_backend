import ChatMessage from '../infra/typeorm/entities/ChatMessage';
import ICreateMessageDTO from '../dtos/ICreateMessageDTO';

export default interface IChatRepository {
  findChatMessages(id_user: string, id_admin: string): Promise<ChatMessage[]>;
  insertMessage(data: ICreateMessageDTO): Promise<ChatMessage>;
}
