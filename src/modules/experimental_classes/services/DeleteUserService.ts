import { injectable, inject } from 'tsyringe';

import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_user: string,
    id_experimentalclass: string,
  ): Promise<void> {
    await this.experimentalClassRepository.deleteUser(
      id_user,
      id_experimentalclass,
    );
  }
}

export default DeleteUserService;
