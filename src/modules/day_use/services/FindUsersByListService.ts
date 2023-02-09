import { injectable, inject } from 'tsyringe';
import DayUseUsers from '../infra/typeorm/entities/DayUseUsers';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindUsersByListService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_dayuse: string): Promise<DayUseUsers[]> {
    const dayUseUsers = this.dayUseRepository.findUsersByList(id_dayuse);

    return dayUseUsers;
  }
}

export default FindUsersByListService;
