import { injectable, inject } from 'tsyringe';
import Notification from '../infra/typeorm/entities/Notification';
import INotificationRepository from '../repositories/INotificationRepository';

@injectable()
class FindAllFromUserService {
  constructor(
    @inject('NotificationsRepository')
    private NotificationsRepository: INotificationRepository,
  ) {}

  public async execute(id_user: string): Promise<Notification[]> {
    const notifications = await this.NotificationsRepository.findAllFromUser(
      id_user,
    );
    return notifications;
  }
}

export default FindAllFromUserService;
