import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import Event from '../infra/typeorm/entities/Event';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class FindByDateService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(date: Date): Promise<Event | undefined> {
    const appointmentDate = startOfHour(date);

    const event = this.eventsRepository.findByDate(appointmentDate);

    return event;
  }
}

export default FindByDateService;
