import { injectable, inject } from 'tsyringe';
import Notification from '../infra/typeorm/entities/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import INotificationRepository from '../repositories/INotificationRepository';

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private NotificationsRepository: INotificationRepository,
  ) {}

  public async execute(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.NotificationsRepository.create(data);
    return notification;
  }
}

export default CreateNotificationService;
