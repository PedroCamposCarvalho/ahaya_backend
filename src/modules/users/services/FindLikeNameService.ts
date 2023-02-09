import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindLikeNameService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(name: string): Promise<User[]> {
    const users = this.usersRepository.findLikeName(name);

    return users;
  }
}

export default FindLikeNameService;
