import { injectable, inject } from 'tsyringe';
import ICreateEventDTO from '../dtos/ICreateEventDTO';
import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(data: ICreateEventDTO): Promise<Event> {
    const dayUse = this.eventsRepository.create(data);

    return dayUse;
  }
}

export default CreateEventService;
