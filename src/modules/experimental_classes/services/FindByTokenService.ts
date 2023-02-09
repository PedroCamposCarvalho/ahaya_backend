import { injectable, inject } from 'tsyringe';
import ExperimentalClass from '../infra/typeorm/entities/ExperimentalClass';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindByTokenService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(token: string): Promise<ExperimentalClass> {
    const experimentalClass =
      this.experimentalClassRepository.findByToken(token);

    return experimentalClass;
  }
}

export default FindByTokenService;
