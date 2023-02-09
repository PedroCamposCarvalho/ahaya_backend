import { injectable, inject } from 'tsyringe';
import SpecificsNotification from '@modules/store/providers/SpecificsNotification';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindAllBirthdaysOnTodayService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllBirthdaysOnToday();
    users.map(async user => {
      if (user.notification_id > '') {
        await SpecificsNotification(
          [user.notification_id],
          'teste',
          'Ignore esta mensagem',
        );
      }
    });
    return users;
  }
}

export default FindAllBirthdaysOnTodayService;
