import { injectable, inject } from 'tsyringe';
import Teacher from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class FindAllTeachersService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(): Promise<Teacher[]> {
    const teachers = this.teachersRepository.findAllTeachers();

    return teachers;
  }
}

export default FindAllTeachersService;
