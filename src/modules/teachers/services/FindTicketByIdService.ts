import { injectable, inject } from 'tsyringe';
import TeacherClassUser from '../infra/typeorm/entities/TeacherClassUser';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindTicketByIdService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_ticket: string): Promise<TeacherClassUser> {
    const user = this.teachersRepository.findTicketById(id_ticket);

    return user;
  }
}

export default FindTicketByIdService;
