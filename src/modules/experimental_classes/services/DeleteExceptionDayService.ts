import { injectable, inject } from 'tsyringe';
import ExperimentalClassException from '../infra/typeorm/entities/ExperimentalClassException';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class DeleteExceptionDayService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(
    id_exceptionDay: string,
  ): Promise<ExperimentalClassException> {
    const exceptionDay =
      await this.experimentalClassRepository.deleteExceptionDay(
        id_exceptionDay,
      );

    return exceptionDay;
  }
}

export default DeleteExceptionDayService;
