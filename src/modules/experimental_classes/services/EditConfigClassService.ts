import { injectable, inject } from 'tsyringe';
import IEditConfigClassDTO from '../dtos/IEditConfigClassDTO';
import ExperimentalClassConfig from '../infra/typeorm/entities/ExperimentalClassConfig';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class EditConfigClassService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    data: IEditConfigClassDTO,
  ): Promise<ExperimentalClassConfig> {
    const experimentalClass =
      this.experimentalClassRepository.editConfigClass(data);

    return experimentalClass;
  }
}

export default EditConfigClassService;
