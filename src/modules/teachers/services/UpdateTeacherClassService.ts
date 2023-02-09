import { injectable, inject } from 'tsyringe';
import TeacherClass from '../infra/typeorm/entities/TeacherClass';
import ITeacherRepository from '../repositories/ITeacherRepository';
import IUpdateTeacherClassDTO from '../dtos/IUpdateTeacherClassDTO';

@injectable()
class UpdateTeacherClassService {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(data: IUpdateTeacherClassDTO): Promise<TeacherClass> {
    const teacherClass = this.teachersRepository.updateTeacherClass(data);

    return teacherClass;
  }
}

export default UpdateTeacherClassService;
