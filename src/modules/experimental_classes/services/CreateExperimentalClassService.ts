import { injectable, inject } from 'tsyringe';
import ICreateExperimentalClassDTO from '../dtos/ICreateExperimentalClassDTO';
import ExperimentalClass from '../infra/typeorm/entities/ExperimentalClass';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class CreateDayUseService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    data: ICreateExperimentalClassDTO,
  ): Promise<ExperimentalClass> {
    const experimentalClass = this.experimentalClassRepository.create(data);

    return experimentalClass;
  }
}

export default CreateDayUseService;
