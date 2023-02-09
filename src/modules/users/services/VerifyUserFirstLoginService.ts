import { injectable, inject } from 'tsyringe';
import UserLogins from '../infra/typeorm/entities/UserLogins';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class VerifyUserFirstLoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<UserLogins[]> {
    const logins = this.usersRepository.verifyUserFirstLogin(id_user);

    return logins;
  }
}

export default VerifyUserFirstLoginService;
