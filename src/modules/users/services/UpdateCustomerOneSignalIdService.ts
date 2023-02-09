import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class UpdateCustomerOneSignalIdService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string, oneSignalId: string): Promise<User> {
    const user = this.usersRepository.updateCustomerOneSignalId(
      id_user,
      oneSignalId,
    );

    return user;
  }
}

export default UpdateCustomerOneSignalIdService;
