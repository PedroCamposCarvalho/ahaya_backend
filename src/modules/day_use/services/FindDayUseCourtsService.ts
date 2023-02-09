import { injectable, inject } from 'tsyringe';
import DayUseCourts from '../infra/typeorm/entities/DayUseCourts';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindDayUseCourtsService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_dayuse: string): Promise<DayUseCourts> {
    const courts = this.dayUseRepository.findDayUseCourts(id_dayuse);

    return courts;
  }
}

export default FindDayUseCourtsService;
