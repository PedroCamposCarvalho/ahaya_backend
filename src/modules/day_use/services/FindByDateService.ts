import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import DayUse from '../infra/typeorm/entities/DayUse';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindByDateService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(date: Date): Promise<DayUse | undefined> {
    const appointmentDate = startOfHour(date);

    const dayUse = this.dayUseRepository.findByDate(appointmentDate);

    return dayUse;
  }
}

export default FindByDateService;
