import { injectable, inject } from 'tsyringe';
import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindByTokenService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(token: string): Promise<Event> {
    const event = this.eventsRepository.findByToken(token);

    return event;
  }
}

export default FindByTokenService;
