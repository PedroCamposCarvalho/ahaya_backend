import { injectable, inject } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindEventAvailabilityService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_event: string): Promise<number> {
    const availability = this.eventsRepository.findEventAvailability(id_event);

    return availability;
  }
}

export default FindEventAvailabilityService;
