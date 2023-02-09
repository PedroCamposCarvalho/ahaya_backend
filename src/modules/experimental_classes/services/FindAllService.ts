import { injectable, inject } from 'tsyringe';
import ExperimentalClass from '../infra/typeorm/entities/ExperimentalClass';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindAllService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_place: string,
    past: boolean,
  ): Promise<ExperimentalClass[]> {
    const experimentalClass = this.experimentalClassRepository.findAll(
      id_place,
      past,
    );

    return experimentalClass;
  }
}

export default FindAllService;
