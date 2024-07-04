import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindBySsnService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(ssn: string): Promise<User | undefined> {
    const user = this.usersRepository.findBySsn(ssn);

    return user;
  }
}

export default FindBySsnService;
