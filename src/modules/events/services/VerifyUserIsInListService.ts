import { injectable, inject } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class VerifyUserIsInListService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_event: string, id_user: string): Promise<boolean> {
    const eventUser = this.eventsRepository.verifyUserIsInList(
      id_event,
      id_user,
    );

    return eventUser;
  }
}

export default VerifyUserIsInListService;
