import { injectable, inject } from 'tsyringe';
import DayUseUsers from '../infra/typeorm/entities/DayUseUsers';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindAllByUserService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_user: string): Promise<DayUseUsers[]> {
    const dayUseUsers = this.dayUseRepository.findAllByUser(id_user);

    return dayUseUsers;
  }
}

export default FindAllByUserService;
