import { injectable, inject } from 'tsyringe';
import UserTypes from '../infra/typeorm/entities/UserTypes';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<UserTypes[]> {
    const userTypes = this.usersRepository.findAllUserTypes();

    return userTypes;
  }
}

export default FindByEmailService;
