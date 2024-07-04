import { injectable, inject } from 'tsyringe';
import TeacherClass from '../infra/typeorm/entities/Teacher';
import ITeacherRepository from '../repositories/ITeacherRepository';

@injectable()
class CreateTeacherService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(name: string): Promise<TeacherClass> {
    const teacher = this.teachersRepository.createTeacher(name);

    return teacher;
  }
}

export default CreateTeacherService;
