import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class IsUserVIPService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<boolean> {
    const isUserVIP = this.usersRepository.isUserVIP(id_user);

    return isUserVIP;
  }
}

export default IsUserVIPService;
