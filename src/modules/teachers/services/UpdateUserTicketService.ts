import { injectable, inject } from 'tsyringe';
import ICreateClassUserDTO from '../dtos/ICreateClassUserDTO';
import TeacherClassUser from '../infra/typeorm/entities/TeacherClassUser';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class UpdateUserTicketService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(data: ICreateClassUserDTO): Promise<TeacherClassUser> {
    const teacher = this.teachersRepository.updateUserTicket(data);

    return teacher;
  }
}

export default UpdateUserTicketService;
