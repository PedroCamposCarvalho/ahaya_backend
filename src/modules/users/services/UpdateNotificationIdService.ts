import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateNotificationIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    id_user: string,
    id_notification: string,
  ): Promise<User> {
    const user = await this.usersRepository.updateNotificationId(
      id_user,
      id_notification,
    );

    return user;
  }
}

export default UpdateNotificationIdService;
