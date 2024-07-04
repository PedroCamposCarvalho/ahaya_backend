import { injectable, inject } from 'tsyringe';

import UserLogins from '../infra/typeorm/entities/UserLogins';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class SaveLoginHistoryService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<UserLogins> {
    const login = await this.usersRepository.saveLogin(id_user);

    return login;
  }
}

export default SaveLoginHistoryService;
