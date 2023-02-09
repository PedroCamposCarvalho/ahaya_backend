import { injectable, inject } from 'tsyringe';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';
import ExperimentalClassException from '../infra/typeorm/entities/ExperimentalClassException';

@injectable()
class FindExceptionDayByPlaceService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_place: string,
  ): Promise<ExperimentalClassException[]> {
    const exceptionDay =
      this.experimentalClassRepository.findExceptionsByPlace(id_place);

    return exceptionDay;
  }
}

export default FindExceptionDayByPlaceService;
