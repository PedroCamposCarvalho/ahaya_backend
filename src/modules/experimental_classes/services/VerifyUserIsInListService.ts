import { injectable, inject } from 'tsyringe';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class VerifyUserIsInListService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_experimentalclass: string,
    id_user: string,
  ): Promise<boolean> {
    const experimentalClassUsers = this.experimentalClassRepository.verifyUserIsInList(
      id_experimentalclass,
      id_user,
    );

    return experimentalClassUsers;
  }
}

export default VerifyUserIsInListService;
