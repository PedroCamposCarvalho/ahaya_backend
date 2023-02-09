import { injectable, inject } from 'tsyringe';
import IUserTicketDTO from '../dtos/IUserTicketDTO';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindUserTicketsService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(ssn: string): Promise<IUserTicketDTO[]> {
    const tickets = this.teachersRepository.findUserTicker(ssn);

    return tickets;
  }
}

export default FindUserTicketsService;
