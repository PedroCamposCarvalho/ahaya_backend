import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindByEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(email: string): Promise<User | undefined> {
    const user = this.usersRepository.findByEmail(email);

    return user;
  }
}

export default FindByEmailService;
