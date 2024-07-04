import { injectable, inject } from 'tsyringe';
import SpecificsNotification from '@modules/store/providers/SpecificsNotification';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateDayUseUsersDTO from '../dtos/ICreateDayUseUsersDTO';
import DayUseUsers from '../infra/typeorm/entities/DayUseUsers';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class CreateDayUseUserService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: ICreateDayUseUsersDTO): Promise<DayUseUsers> {
    const dayUseUser = await this.dayUseRepository.createUser(data);

    const user = await this.usersRepository.findById(data.id_user);

    const adminUsers = await this.usersRepository.findAllAdminUsers();

    const notificationIds = adminUsers.map(item => item.one_signal_id);

    // SpecificsNotification(notificationIds, `Day Use Vendido!`, `${user?.name}`);

    return dayUseUser;
  }
}

export default CreateDayUseUserService;
