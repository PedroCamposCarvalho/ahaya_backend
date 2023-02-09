import { injectable, inject } from 'tsyringe';
import TeacherWeekClassUsers from '../infra/typeorm/entities/TeacherWeekClassUsers';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class RetrieveTicketService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_classuser: string): Promise<TeacherWeekClassUsers> {
    const userClass = await this.teachersRepository.retrieveTicket(
      id_classuser,
    );

    return userClass;
  }
}

export default RetrieveTicketService;
