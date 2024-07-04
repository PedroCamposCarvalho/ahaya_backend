import { injectable, inject } from 'tsyringe';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class VerifyUserIsInListService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_dayuse: string, id_user: string): Promise<boolean> {
    const dayUseUsers = this.dayUseRepository.verifyUserIsInList(
      id_dayuse,
      id_user,
    );

    return dayUseUsers;
  }
}

export default VerifyUserIsInListService;
