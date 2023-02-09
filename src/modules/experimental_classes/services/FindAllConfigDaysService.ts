import { injectable, inject } from 'tsyringe';
import ExperimentalClassConfig from '../infra/typeorm/entities/ExperimentalClassConfig';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindAllConfigDaysService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(id_place: string): Promise<ExperimentalClassConfig[]> {
    const experimentalClasses =
      await this.experimentalClassRepository.findAllConfigDays();

    return experimentalClasses.filter(item => item.id_place === id_place);
  }
}

export default FindAllConfigDaysService;
