import { injectable, inject } from 'tsyringe';
import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_event: string): Promise<Event> {
    const event = this.eventsRepository.deleteEvent(id_event);

    return event;
  }
}

export default DeleteEventService;
