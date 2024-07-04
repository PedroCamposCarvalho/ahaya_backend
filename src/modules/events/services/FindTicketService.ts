import { injectable, inject } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';
import EventUser from '../infra/typeorm/entities/EventUser';

@injectable()
class FindTicketService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_ticket: string): Promise<EventUser> {
    const eventUser = this.eventsRepository.retrieveTicket(id_ticket);

    return eventUser;
  }
}

export default FindTicketService;
