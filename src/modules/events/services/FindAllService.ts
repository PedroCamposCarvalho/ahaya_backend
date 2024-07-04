import { injectable, inject } from 'tsyringe';
import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindAllService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(limit: number): Promise<Event[]> {
    const events = this.eventsRepository.findAll(limit);

    return events;
  }
}

export default FindAllService;
