import { injectable, inject } from 'tsyringe';
import ICreateConfigClassDTO from '../dtos/ICreateConfigClassDTO';
import ExperimentalClassConfig from '../infra/typeorm/entities/ExperimentalClassConfig';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class CreateConfigExperimentalClassService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    data: ICreateConfigClassDTO,
  ): Promise<ExperimentalClassConfig> {
    const configClass =
      this.experimentalClassRepository.createConfigClass(data);

    return configClass;
  }
}

export default CreateConfigExperimentalClassService;
