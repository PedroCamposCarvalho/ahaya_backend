import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ChangeVIPStatusService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<User> {
    const user = this.usersRepository.changeVIPStatus(id_user);

    return user;
  }
}

export default ChangeVIPStatusService;
