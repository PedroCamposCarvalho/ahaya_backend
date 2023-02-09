import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IChatRepository from '../repositories/IChatRepository';
import AppError from '@shared/errors/AppError';

interface UserMessage {
  _id: string;
  name: string;
  avatar: string;
}
interface Messages {
  _id: string;
  text: string;
  createdAt: Date;
  user: UserMessage;
}

@injectable()
class CreateMemberService {
  constructor(
    @inject('ChatRepository')
    private chatRepository: IChatRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id_user: string,
    id_admin: string,
    sender: string,
  ): Promise<Messages[]> {
    const chats = await this.chatRepository.findChatMessages(id_user, id_admin);

    const user = await this.usersRepository.findById(sender);

    if (!user) {
      throw new AppError('User not found');
    }

    const messagesToReturn: Messages[] = [];

    chats.map(item => {
      const userMessage: UserMessage = {
        _id: sender,
        name: user.name,
        avatar: user.avatar,
      };
      const newMessage: Messages = {
        _id: item._id,
        text: item.text,
        createdAt: item.createdAt,
        user: userMessage,
      };

      messagesToReturn.push(newMessage);
    });

    return messagesToReturn;
  }
}

export default CreateMemberService;
