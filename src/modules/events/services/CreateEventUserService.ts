import { injectable, inject } from 'tsyringe';
import ICreateEventUserDTO from '../dtos/ICreateEventUserDTO';
import EventUser from '../infra/typeorm/entities/EventUser';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class CreateEventUserService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(data: ICreateEventUserDTO): Promise<EventUser> {
    const dayUseUser = this.eventsRepository.createUser(data);

    return dayUseUser;
  }
}

export default CreateEventUserService;
