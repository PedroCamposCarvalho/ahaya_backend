import { injectable, inject } from 'tsyringe';
import ExperimentalClassUsers from '../infra/typeorm/entities/ExperimentalClassUsers';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindAllByUserService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(id_user: string): Promise<ExperimentalClassUsers[]> {
    const experimentalClassUsers =
      this.experimentalClassRepository.findAllByUser(id_user);

    return experimentalClassUsers;
  }
}

export default FindAllByUserService;
