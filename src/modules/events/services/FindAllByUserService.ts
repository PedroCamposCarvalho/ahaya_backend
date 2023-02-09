import { injectable, inject } from 'tsyringe';
import EventUser from '../infra/typeorm/entities/EventUser';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindAllByUserService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_user: string): Promise<EventUser[]> {
    const eventUsers = this.eventsRepository.findAllByUser(id_user);

    return eventUsers;
  }
}

export default FindAllByUserService;
