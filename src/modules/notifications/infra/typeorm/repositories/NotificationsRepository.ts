import { getRepository, Repository } from 'typeorm';

// import AppError from '@shared/errors/AppError';
import INotificationRepository from '../../../repositories/INotificationRepository';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import Notification from '../entities/Notification';

class NotificationsRepository implements INotificationRepository {
  private notificationRepository: Repository<Notification>;

  constructor() {
    this.notificationRepository = getRepository(Notification);
  }

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = await this.notificationRepository.create({
      id_user: data.id_user,
      title: data.title,
      text: data.text,
    });

    await this.notificationRepository.save(notification);

    return notification;
  }

  public async findAllFromUser(id_user: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.find({
      where: { id_user },
    });

    return notifications;
  }
}
export default NotificationsRepository;
