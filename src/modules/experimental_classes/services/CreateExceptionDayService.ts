import { injectable, inject } from 'tsyringe';
import ICreateExceptionDayDTO from '../dtos/ICreateExceptionDayDTO';
import ExperimentalClassException from '../infra/typeorm/entities/ExperimentalClassException';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class CreateExceptionDayService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    data: ICreateExceptionDayDTO,
  ): Promise<ExperimentalClassException> {
    const exceptionDay =
      this.experimentalClassRepository.createExceptionDay(data);

    return exceptionDay;
  }
}

export default CreateExceptionDayService;
