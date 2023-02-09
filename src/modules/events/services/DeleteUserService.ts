import { injectable, inject } from 'tsyringe';

import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id_user: string, id_event: string): Promise<void> {
    await this.eventsRepository.deleteUser(id_user, id_event);
  }
}

export default DeleteUserService;
