import { injectable, inject } from 'tsyringe';
import ExperimentalClassUsers from '../infra/typeorm/entities/ExperimentalClassUsers';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindUsersByListService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_experimentalclass: string,
  ): Promise<ExperimentalClassUsers[]> {
    const experimentalClassUsers = this.experimentalClassRepository.findUsersByList(
      id_experimentalclass,
    );

    return experimentalClassUsers;
  }
}

export default FindUsersByListService;
