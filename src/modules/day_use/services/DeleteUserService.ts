import { injectable, inject } from 'tsyringe';

import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_user: string, id_dayuse: string): Promise<void> {
    await this.dayUseRepository.deleteUser(id_user, id_dayuse);
  }
}

export default DeleteUserService;
