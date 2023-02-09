import Notification from '../infra/typeorm/entities/Notification';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';

export default interface IVouchersRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  findAllFromUser(id_user: string): Promise<Notification[]>;
}
