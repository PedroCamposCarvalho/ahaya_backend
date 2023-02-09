import { injectable, inject } from 'tsyringe';
import EventCourt from '../infra/typeorm/entities/EventCourt';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindEventsCourtsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_event: string): Promise<EventCourt> {
    const courts = this.eventsRepository.findEventCourts(id_event);

    return courts;
  }
}

export default FindEventsCourtsService;
