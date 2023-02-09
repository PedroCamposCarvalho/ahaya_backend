import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class IsUserAdminService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<boolean> {
    const userType = await this.usersRepository.verifyUserCategory(id_user);

    if (userType.name === 'Administrator') {
      return true;
    }

    return false;
  }
}

export default IsUserAdminService;
