import { injectable, inject } from 'tsyringe';
import IDayUseRepository from '../repositories/IDayUseRepository';

@injectable()
class FindDayUseAvailabilityService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_dayuse: string): Promise<number> {
    const availability = this.dayUseRepository.findDayUseAvailability(
      id_dayuse,
    );

    return availability;
  }
}

export default FindDayUseAvailabilityService;
