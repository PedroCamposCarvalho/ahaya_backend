import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import ExperimentalClass from '../infra/typeorm/entities/ExperimentalClass';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindByDateService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(date: Date): Promise<ExperimentalClass | undefined> {
    const appointmentDate = startOfHour(date);

    const experimentalClass =
      this.experimentalClassRepository.findByDate(appointmentDate);

    return experimentalClass;
  }
}

export default FindByDateService;
