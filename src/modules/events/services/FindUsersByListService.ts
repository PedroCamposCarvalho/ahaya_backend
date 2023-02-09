import { injectable, inject } from 'tsyringe';
import EventUser from '../infra/typeorm/entities/EventUser';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindUsersByListService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_event: string): Promise<EventUser[]> {
    const eventUsers = this.eventsRepository.findUsersByList(id_event);

    return eventUsers;
  }
}

export default FindUsersByListService;
