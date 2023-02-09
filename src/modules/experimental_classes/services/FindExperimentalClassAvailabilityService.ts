import { injectable, inject } from 'tsyringe';
import IExperimentalClassRepository from '../repositories/IExperimentalClassRepository';

@injectable()
class FindExperimentalClassAvailabilityService {
  constructor(
    @inject('ExperimentalClassRepository')
    private experimentalClassRepository: IExperimentalClassRepository,
  ) {}

  public async execute(id_experimentalclass: string): Promise<number> {
    const availability =
      this.experimentalClassRepository.findExperimentalClassAvailability(
        id_experimentalclass,
      );

    return availability;
  }
}

export default FindExperimentalClassAvailabilityService;
