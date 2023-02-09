import { injectable, inject } from 'tsyringe';
import TeacherClass from '../infra/typeorm/entities/TeacherClass';
import ITeacherRepository from '../repositories/ITeacherRepository';
import ICreateTeacherClassDTO from '../dtos/ICreateTeacherClassDTO';

@injectable()
class CreateTeacherClass {
  constructor(
    @inject('TeacherRepository')
    private teachersRepository: ITeacherRepository,
  ) {}

  public async execute(data: ICreateTeacherClassDTO): Promise<TeacherClass> {
    const teacherClass = this.teachersRepository.createTeacherClass(data);

    return teacherClass;
  }
}

export default CreateTeacherClass;
