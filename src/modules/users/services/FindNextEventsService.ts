import { injectable, inject } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IReturnUserEventsDTO from '../dtos/IReturnUserEventsDTO';

@injectable()
class FindNextEventsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id_user: string): Promise<IReturnUserEventsDTO[]> {
    const user = this.usersRepository.findNextEvents(id_user);

    return user;
  }
}

export default FindNextEventsService;
