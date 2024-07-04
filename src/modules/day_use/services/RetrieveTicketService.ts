import { injectable, inject } from 'tsyringe';
import IDayUseRepository from '../repositories/IDayUseRepository';
import DayUseUsers from '../infra/typeorm/entities/DayUseUsers';

@injectable()
class RetrieveTicketService {
  constructor(
    @inject('DayUseRepository')
    private dayUseRepository: IDayUseRepository,
  ) {}

  public async execute(id_ticket: string): Promise<DayUseUsers> {
    const dayUseUsers = this.dayUseRepository.retrieveTicket(id_ticket);

    return dayUseUsers;
  }
}

export default RetrieveTicketService;
