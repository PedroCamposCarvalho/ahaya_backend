import { injectable, inject } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindTeacherByIdService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(id_teacher: string): Promise<Teacher> {
    const teacher = this.teachersRepository.findTeacherById(id_teacher);

    return teacher;
  }
}

export default FindTeacherByIdService;
